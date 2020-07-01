#ifndef _MATRIX_H
#define _MATRIX_H

#include<iostream>
#include<vector>

using namespace std;

class Matrix {
	private :
		unsigned int M;
		unsigned int N;
		vector<vector<double>> A;
	public :
		// Generator
		Matrix(unsigned int m, unsigned int n);
		
		// Getter & Setter
		unsigned int getRow() const;
		unsigned int getCol() const;
		double getElement(unsigned int m, unsigned int n) const;
		void setRow(unsigned int m);
		void setCol(unsigned int n);
		void setElement(unsigned int m, unsigned int n, double a);
		
		// Inverse && Determinant && transposing
		Matrix inverse();
		Matrix makeCofactor(unsigned int m, unsigned int n);
		double determinant();
		Matrix transposing();

		// Operator Overiding
		Matrix operator+(const Matrix &A);
		Matrix operator-(const Matrix &A);
		Matrix operator*(const Matrix &A);
		Matrix& operator=(const Matrix &A);

		// Push
		void pushBack(const vector<double> V);
		void pushBack(int I, const double t); 
};

std::ostream& operator << (std::ostream& os, const Matrix &A);

#endif
