#ifndef _SEIR__
#define _SEIR__

#include"ProjectHeader.hpp"

SEIR::SEIR(double popul, double BR,
	double exp,
	double gam,
	vector<double> Sdata,
	vector<double> Idata,
	vector<double> Rdata,
	vector<double> ini) 
{
	vector<double> v = lsqcurvfit(popul, BR, exp , gam, ini, Idata, Sdata);
	vector<vector<double>> tmp;
	beta = v[0];
	exposed = exp,
	gamma = gam;
	tmp = EulerMethod(popul, BR, 365);

	S = tmp[0];
	E = tmp[1];
	I = tmp[2];
	R = tmp[3];
}

SEIR::SEIR(double popul, double BR,
	double exp,
	double gam,
	double vac,
	vector<double> Sdata,
	vector<double> Idata,
	vector<double> Rdata,
	vector<double> ini) 
{
	vector<double> v = lsqcurvfit(popul, BR, exp , gam, vac, ini, Idata, Sdata);
	vector<vector<double>> tmp;
	beta = v[0];
	exposed = exp,
	gamma = gam;
	tmp = EulerMethod_vac(popul, BR, vac, 365);

	S = tmp[0];
	E = tmp[1];
	I = tmp[2];
	R = tmp[3];
}

double SEIR::getData(unsigned int i, unsigned int j) {
	if (S.size() < j) { return -1; }
	else {
		if (i == 0) {
			return S[j];
		}
		else if (i == 1) {
			return E[j];
		}
		else if (i == 2) {
			return I[j];
		}
		else if (i == 3) {
			return R[j];
		}
		return -1;
	}
}

int SEIR::getPeriod() { return total;  }

vector<vector<double>> SEIR::EulerMethod(double popul, double BR, int period) {
	//fist vector S, Second I, Third R
	vector<vector<double>> result(4, vector<double>(0, 0));
	double tmpS1, tmpS2, tmpE1, tmpE2, tmpI1, tmpI2, tmpR1, tmpR2;
	int i = 0;

	tmpS1 = popul - 1;
	tmpE1 = 0.0;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	while(tmpI1 > 0.7) {
		tmpS2 = tmpS1
			+ 0.01 * (0.0 - beta*tmpS1*tmpI1 / popul);

		tmpE2 = tmpE1
			+ 0.01 * (beta * tmpS1 * tmpI1 / popul
				- exposed * tmpE1);

		tmpI2 = tmpI1
			+ 0.01 * (exposed * tmpE1
				- gamma * tmpI1);

		tmpR2 = tmpR1
			+ 0.01 * (gamma * tmpI1);

		if (i % 100 == 0) {
			result[0].push_back( tmpS1 );
			result[1].push_back( tmpE1 );
			result[2].push_back( tmpI1 );
			result[3].push_back( tmpR1);
		}

		tmpS1 = tmpS2;
		tmpE1 = tmpE2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
		i++;
	}

	total = i / 100;
	return result;
}

vector<vector<double>> SEIR::EulerMethod_vac(double popul, double BR, double vac, int period) {
	//fist vector S, Second I, Third R
	vector<vector<double>> result(4, vector<double>(0, 0));
	double tmpS1, tmpS2, tmpE1, tmpE2, tmpI1, tmpI2, tmpR1, tmpR2;
	int i = 0;

	tmpS1 = popul - 1;
	tmpE1 = 0.0;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	while(tmpI1 > 0.7) {
		tmpS2 = tmpS1
			+ 0.01 * (0.0 - beta*tmpS1*tmpI1 / popul - vac * tmpS1);

		tmpE2 = tmpE1
			+ 0.01 * (beta * tmpS1 * tmpI1 / popul
				- exposed * tmpE1);

		tmpI2 = tmpI1
			+ 0.01 * (exposed * tmpE1
				- gamma * tmpI1);

		tmpR2 = tmpR1
			+ 0.01 * (gamma * tmpI1 + vac * tmpS1);

		if (i % 100 == 0) {
			result[0].push_back( tmpS1 );
			result[1].push_back( tmpE1 );
			result[2].push_back( tmpI1 );
			result[3].push_back( tmpR1);
		}

		tmpS1 = tmpS2;
		tmpE1 = tmpE2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
		i++;
	}

	total = i / 100;
	return result;
}

vector<vector<double>> euler_method_SEIR(double popul,
	double BR,
	double b,
	double exp,
	double r,
	int period)
{
	//fist vector S, Second I, Third R
	vector<vector<double>> result(4, vector<double>(period, 0));
	double tmpS1, tmpS2,tmpE1, tmpE2, tmpI1, tmpI2, tmpR1, tmpR2;

	tmpS1 = popul - 1;
	tmpE1 = 0.0;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	for (int i = 0; i < 100 * (period - 1) + 1; i++) {
		tmpS2 = tmpS1
			+ 0.01 * (0.0 -b*tmpS1*tmpI1 / popul);

		tmpE2 = tmpE1
			+ 0.01 * (b * tmpS1 * tmpI1 / popul
				- exp * tmpE1);

		tmpI2 = tmpI1
			+ 0.01 * (exp * tmpE1
				- r * tmpI1);

		tmpR2 = tmpR1
			+ 0.01 * (r * tmpI1
				- BR * tmpR1);
		if (i % 100 == 0) {
			result[0][i / 100] = tmpS1;
			result[1][i / 100] = tmpE1;
			result[2][i / 100] = tmpI1;
			result[3][i / 100] = tmpR1;
		}

		tmpS1 = tmpS2;
		tmpE1 = tmpE2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
	}

	return result;
}

vector<vector<double>> euler_method_SEIR(double popul,
	double BR,
	double b,
	double exp,
	double r,
	double vaccine,
	int period) {
	//fist vector S, Second I, Third R
	vector<vector<double>> result(3, vector<double>(period, 0));
	double tmpS1, tmpS2, tmpE1, tmpE2, tmpI1, tmpI2, tmpR1, tmpR2;

	tmpS1 = popul - 1;
	tmpE1 = 0.0;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	for (int i = 0; i < 100 * (period - 1) + 1; i++) {
		tmpS2 = tmpS1
			+ 0.01 * (- b*tmpS1*tmpI1 / popul
				- vaccine * tmpS1);

		tmpE2 = tmpE1
			+ 0.01 * (b * tmpS1 * tmpI1 / popul
				- exp * tmpE1);

		tmpI2 = tmpI1
			+ 0.01 * (exp * tmpE1
				- r * tmpI1);

		tmpR2 = tmpR1
			+ 0.01 * (r * tmpI1
				+ vaccine * tmpS1);

		if (i % 100 == 0) {
			result[0][i / 100] = tmpS1;
			result[1][i / 100] = tmpE1;
			result[2][i / 100] = tmpI1;
			result[3][i / 100] = tmpR1;
		}

		tmpS1 = tmpS2;
		tmpE1 = tmpE2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
	}

	return result;
}

vector<double> SEIR::lsqcurvfit(double popul, double BR,
	double exp,
	double gam,
	double vac,
	vector<double> ini,
	vector<double> Idata,
	vector<double> Sdata) {

	Matrix B = Matrix(1, 1);
	vector<double> result(1, 1);
	B.setElement(0, 0, ini[0]);
	double dt = 0.0000000001;

	for (int k = 0; k < 1000; k++) {
		Matrix Jacob = Matrix(0, 0);
		Matrix Residu = Matrix(0, 0);
		Matrix tmp = Matrix(0, 0);
		vector<vector<double>> sol(0, vector<double>(0));
		vector<double> tempB1(0);
		vector<double> tempB2(0);

		tempB1 = get_residue_SEIR(popul, BR, B.getElement(0, 0), exp , gam, vac, 0.0, Idata);
		tempB2 = get_residue_SEIR(popul, BR, B.getElement(0, 0), exp , gam, vac, dt, Idata);
		for (unsigned int i = 0; i < tempB1.size(); i++) {
			tempB1[i] = tempB1[i] - tempB2[i];
		}

		Jacob.pushBack(tempB1);

		sol = euler_method_SEIR(popul, BR, B.getElement(0, 0), exp , gam, vac, Idata.size());

		for (unsigned int i = 0; i < Idata.size(); i++) {
			sol[2][i] = Idata[i] - sol[2][i];
		}

		Residu.pushBack(sol[2]);

		for (unsigned int i = 0; i < Jacob.getRow(); i++) {
			for (unsigned int j = 0; j < Jacob.getCol(); j++) {
				Jacob.setElement(i, j, Jacob.getElement(i, j) / dt);
			}
		}

		tmp = Jacob;
		tmp = tmp*Jacob.transposing();
		tmp = tmp.inverse();
		tmp = tmp * Jacob;
		tmp = tmp * Residu.transposing();

		B = B - tmp;
	}
	result[0] = B.getElement(0, 0);


	return result;
}

vector<double> SEIR::lsqcurvfit(double popul, double BR,
	double exp,
	double gam,
	vector<double> ini,
	vector<double> Idata,
	vector<double> Sdata) {

	Matrix B = Matrix(1, 1);
	vector<double> result(1, 1);
	B.setElement(0, 0, ini[0]);
	double dt = 0.0000000001;

	for (int k = 0; k < 1000; k++) {
		Matrix Jacob = Matrix(0, 0);
		Matrix Residu = Matrix(0, 0);
		Matrix tmp = Matrix(0, 0);
		vector<vector<double>> sol(0, vector<double>(0));
		vector<double> tempB1(0);
		vector<double> tempB2(0);

		tempB1 = get_residue_SEIR(popul, BR, B.getElement(0, 0), exp , gam, 0.0, Idata);
		tempB2 = get_residue_SEIR(popul, BR, B.getElement(0, 0), exp , gam, dt, Idata);
		for (unsigned int i = 0; i < tempB1.size(); i++) {
			tempB1[i] = tempB1[i] - tempB2[i];
		}

		Jacob.pushBack(tempB1);

		sol = euler_method_SEIR(popul, BR, B.getElement(0, 0), exp , gam, Idata.size());

		for (unsigned int i = 0; i < Idata.size(); i++) {
			sol[2][i] = Idata[i] - sol[2][i];
		}

		Residu.pushBack(sol[2]);

		for (unsigned int i = 0; i < Jacob.getRow(); i++) {
			for (unsigned int j = 0; j < Jacob.getCol(); j++) {
				Jacob.setElement(i, j, Jacob.getElement(i, j) / dt);
			}
		}

		tmp = Jacob;
		tmp = tmp*Jacob.transposing();
		tmp = tmp.inverse();
		tmp = tmp * Jacob;
		tmp = tmp * Residu.transposing();

		B = B - tmp;
	}
	result[0] = B.getElement(0, 0);


	return result;
}

vector<double> get_residue_SEIR(double popul, double BR,
	double b,
	double exp,
	double r,
	double betaDef,
	vector<double> Idata) {
	vector<double> result(Idata.size(), 0);
	vector<vector<double>> model = euler_method_SEIR(popul, BR, b - betaDef,  exp, r, Idata.size());

	for (unsigned int i = 0; i < result.size(); i++) {
		result[i] = model[2][i];
	}

	for (unsigned int i = 0; i < result.size(); i++) {
		result[i] = Idata[i] - result[i];
	}

	return result;
}

vector<double> get_residue_SEIR(double popul, double BR,
	double b,
	double exp,
	double r,
	double vac,
	double betaDef,
	vector<double> Sdata) {
	vector<double> result(Sdata.size(), 0);
	vector<vector<double>> model = euler_method_SEIR(popul, BR, b - betaDef, exp, r, vac, Sdata.size());

	for (unsigned int i = 0; i < result.size(); i++) {
		result[i] = model[0][i];
	}

	for (unsigned int i = 0; i < result.size(); i++) {
		result[i] = Sdata[i] - result[i];
	}

	return result;
}
#endif
