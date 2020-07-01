#include"Matrix.hpp"

// Generator
template <typename T>
Matrix<T>::Matrix(int m, int n) : M(m), N(n) {
	for(int i = 0; i < m; i++){
		A.push_back(vector<T>(n, T(0)));
	}
}



// Getter& Setter
template <typename T>
int Matrix<T>::getRow() const { return M; }

template <typename T>
int Matrix<T>::getCol() const { return N; }

template <typename T>
T Matrix<T>::getElement(int m, int n) const {
	return A[m][n];
}

template <typename T>
void Matrix<T>::setRow(int m) { M = m; }

template <typename T>
void Matrix<T>::setCol(int n) { N = n; }

template <typename T>
void Matrix<T>::setElement(int m, int n, T a) {
	A[m][n] = a;
}



// Inverse & Determinant
template <typename T>
Matrix<T> Matrix<T>::inverse() {
	T det = determinant();
	
	if(getRow() != getCol()) {
		Matrix result = Matrix<T>(0,0);
		return result;
	}
	else{
		Matrix result = Matrix<T>(getRow(), getCol());
		for(int i = 0; i < getRow(); i++) {
			for(int j = 0; j < getCol(); j++){
				result.setElement(i, j, (makeCofactor(i,j).determinant())/det);
			}
		}
		return result;
	}
}

template <typename T>
Matrix<T> Matrix<T>::makeCofactor(int m, int n) {
	if(M != N) return Matrix<T>(0, 0);
	else{
		Matrix<T> result = Matrix<T>(M-1, N-1);

		for(int i = 0; i < M; i++){
			if(i == m) {}
			else {
				for( int j = 0; j < N; j++){
					if( j == n ) {}
					else {
						if(i > m && j > n){
							result.setElement(i-1, j-1, getElement(i, j));
						}
						else if(i > m){
							result.setElement(i-1, j, getElement(i,j));
						}
						else if(j > n) {
							result.setElement(i, j-1, getElement(i,j));
						}
						else {
							result.setElement(i, j, getElement(i,j));
						}	
					}
				}
			}
		}
		return result;
	}
}

template <typename T>
T Matrix<T>::determinant() {
	if(M != N) return T();
	else if(M == 1){
		return getElement(0, 0);
	}
	else {
		T result = T(0);
		int sign = 1;
		for(int i = 0; i < M; i++) {
			result += sign*A[0][i]*makeCofactor(0,i).determinant();
			sign *= -1;
		}
		return result;
	}
}

template <typename T>
Matrix<T> Matrix<T>::transposing() {
	Matrix<T> result = Matrix<T>(N, M);

	for(int i = 0; i < N; i++) {
		for(int j = 0; j < M; j++) {
			result.setElement(i,j, getElement(j,i));
		}
	}

	return result;
}


// Operator Overiding
template <typename T>
Matrix<T>& Matrix<T>::operator+(const Matrix<T> &Ar) {
	if(this->M != Ar.getRow() || this->N != Ar.getCol()) {}
	else {
		Matrix<T> result = Matrix<T>(this->M, this->N);
		for(int i = 0; i < this->M; i++) {
			for(int j = 0; j < this->N; j++) {
				result.setElement(i, j, getElement(i, j) + Ar.getElement(i, j));
			}
		}
		
		return result;
	}
}

template <typename T>
Matrix<T>& Matrix<T>::operator-(const Matrix<T> &Ar) {
	if(this->M != Ar.getRow() || this->N != Ar.getCol()) {}
	else {
		Matrix<T> result = Matrix<T>(this->M, this->N);
		for(int i = 0; i < this->M; i++) {
			for(int j = 0; j < this->N; j++) {
				result.setElement(i, j, getElement(i, j) - Ar.getElement(i, j));
			}
		}
		
		return result;
	}
}	

template <typename T>
Matrix<T>& Matrix<T>::operator*(const Matrix<T> &Ar) {
	if(this->N != Ar.getRow()) {}
	else {
		Matrix<T> result = Matrix<T>(this->M, Ar.getCol());
		for(int i = 0; i < this->M; i++) {
			for(int j = 0; j < Ar.getCol(); j++) {
				for(int k = 0; k < this->N; k++) {
					result.setElement(i, j, result.getElement(i,j) + getElement(i,k) * Ar.getElement(k,j));
				}
			}
		}
		return result;
	}
}

template <typename T>
Matrix<T>& Matrix<T>::operator=(const Matrix<T> &Ar) {
	vector<T> tmp(Ar.getCol());
	
	setRow(Ar.getRow());
	setCol(Ar.getCol());

	A.resize(Ar.getRow());

	for(int i = 0; i < M; i++) {
		A[i] = tmp;
	}
	

	for(int i = 0; i < M; i++) {
		for(int j = 0; j < N; j++) {
			setElement(i,j, Ar.getElement(i,j));
		}
	}

	return *this;
}

template <typename T>
void Matrix<T>::pushBack(const vector<T> V) {
	if(N != 0){
		if(V.size() == N) {
			M++;
			A.push_back(V);
		}
	}
	else {
		M++;
		N = V.size();
		A.push_back(V);
	}
}

template <typename T>
void Matrix<T>::pushBack(int I, const T t) {
	N++;
	A[I].push_back(t);
}


template <typename T>
std::ostream& operator<<(std::ostream& os, const Matrix<T> &A) {
	for(int i = 0; i < A.getRow(); i++) {
		for(int j = 0; j < A.getCol(); j++) {
			os << A.getElement(i, j) << " ";
		}
		os << endl;	
	}
	return os;
}
