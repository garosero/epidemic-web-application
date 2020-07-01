#include"ProjectHeader.hpp"

// Generator
Matrix::Matrix(unsigned int m, unsigned int n) : M(m), N(n) {
	for(unsigned int i = 0; i < m; i++){
		A.push_back(vector<double>(n, 0.0));
	}
}



// Getter& Setter
unsigned int Matrix::getRow() const { return M; }

unsigned int Matrix::getCol() const { return N; }

double Matrix::getElement(unsigned int m, unsigned int n) const {
	if(M < m || N < n) {
		cout << "Error!!! element doesn't exist!" << endl;
		return 0;
	}
	else{
		return A[m][n];
	}
}

void Matrix::setRow(unsigned int m) { M = m; }

void Matrix::setCol(unsigned int n) { N = n; }

void Matrix::setElement(unsigned int m, unsigned int n, double a) {
	A[m][n] = a;
}



// Inverse & Determinant
Matrix Matrix::inverse() {
	double det = determinant();
	
	if(getRow() != getCol()) {
		Matrix result = Matrix(0,0);
		return result;
	}
	else if (getRow() == 1) {
		Matrix result = Matrix(getRow(), getCol());
		result.setElement(0, 0, 1.0 / getElement(0, 0));
		return result;
	}
	else{
		Matrix result = Matrix(getRow(), getCol());
		for(unsigned int i = 0; i < getRow(); i++) {
			for(unsigned int j = 0; j < getCol(); j++){
				result.setElement(i, j, (makeCofactor(i,j).determinant())/det);
			}
		}
		return result;
	}
}

Matrix Matrix::makeCofactor(unsigned int m, unsigned int n) {
	if(M != N) {
		Matrix result = Matrix(0, 0);
		return result;
	}
	else{
		Matrix result = Matrix(M-1, N-1);

		for(unsigned int i = 0; i < M; i++){
			if(i == m) {}
			else {
				for(unsigned int j = 0; j < N; j++){
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

double Matrix::determinant() {
	if(M != N) return 0.0;
	else if(M == 1){
		return getElement(0, 0);
	}
	else {
		double result = 0.0;
		double sign = 1.0;
		for(unsigned int i = 0; i < M; i++) {
			result += sign*A[0][i]*makeCofactor(0,i).determinant();
			sign *= -1.0;
		}
		return result;
	}
}

Matrix Matrix::transposing() {
	Matrix result = Matrix(N, M);

	for(unsigned int i = 0; i < N; i++) {
		for(unsigned int j = 0; j < M; j++) {
			result.setElement(i,j, getElement(j,i));
		}
	}

	return result;
}


// Operator Overiding
Matrix Matrix::operator+(const Matrix &Ar) {
	if(this->M != Ar.getRow() || this->N != Ar.getCol()) {
		return *this;
	}
	else {
		Matrix result = Matrix(this->M, this->N);
		for(unsigned int i = 0; i < this->M; i++) {
			for(unsigned int j = 0; j < this->N; j++) {
				result.setElement(i, j, getElement(i, j) + Ar.getElement(i, j));
			}
		}
		
		return result;
	}
}

Matrix Matrix::operator-(const Matrix &Ar) {
	if(this->M != Ar.getRow() || this->N != Ar.getCol()) {
		return *this;
	}
	else {
		Matrix result = Matrix(this->M, this->N);
		for(unsigned int i = 0; i < this->M; i++) {
			for(unsigned int j = 0; j < this->N; j++) {
				result.setElement(i, j, getElement(i, j) - Ar.getElement(i, j));
			}
		}
		
		return result;
	}
}	

Matrix Matrix::operator*(const Matrix &Ar) {
	if(this->N != Ar.getRow()) {
		return *this;
	}
	else {
		Matrix result = Matrix(this->M, Ar.getCol());
		for(unsigned int i = 0; i < this->M; i++) {
			for(unsigned int j = 0; j < Ar.getCol(); j++) {
				for(unsigned int k = 0; k < this->N; k++) {
					result.setElement(i, j, result.getElement(i,j) + getElement(i,k) * Ar.getElement(k,j));
				}
			}
		}
		return result;
	}
}

Matrix& Matrix::operator=(const Matrix &Ar) {
	vector<double> tmp(Ar.getCol());
	
	setRow(Ar.getRow());
	setCol(Ar.getCol());

	A.resize(Ar.getRow());

	for(unsigned int i = 0; i < M; i++) {
		A[i] = tmp;
	}
	

	for(unsigned int i = 0; i < M; i++) {
		for(unsigned int j = 0; j < N; j++) {
			setElement(i,j, Ar.getElement(i,j));
		}
	}

	return *this;
}

void Matrix::pushBack(const vector<double> V) {
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

void Matrix::pushBack(int I, const double t) {
	N++;
	A[I].push_back(t);
}


std::ostream& operator<<(std::ostream& os, const Matrix &A) {
	for(unsigned int i = 0; i < A.getRow(); i++) {
		for(unsigned int j = 0; j < A.getCol(); j++) {
			os << A.getElement(i, j) << " ";
		}
		os << endl;	
	}
	return os;
}
