#ifndef _SIR__
#define _SIR__

#include"ProjectHeader.hpp"

SIR::SIR( double popul, double BR,
		double gam,
		vector<double> Sdata,
		vector<double> Idata,
		vector<double> Rdata, 
		vector<double> ini) {
	vector<double> v = lsqcurvfit(popul, BR,gam ,ini, Idata);
       	vector<vector<double>> tmp;
	beta = v[0];
	gamma = gam;	
	tmp = EulerMethod(popul, BR, 365);
	
	total = tmp[0].size();

	S = tmp[0];
	I = tmp[1];
	R = tmp[2];
}

SIR::SIR( double popul, double BR,
		double gam,
		double vac,
		vector<double> Sdata,
		vector<double> Idata,
		vector<double> Rdata, 
		vector<double> ini) {
	vector<double> v = lsqcurvfit(popul, BR, vac, gam ,ini, Idata);
       	vector<vector<double>> tmp;
	beta = v[0];
	gamma = gam;	
	tmp = EulerMethod(popul, BR, 365);
	
	total = tmp[0].size();

	S = tmp[0];
	I = tmp[1];
	R = tmp[2];
}

double SIR::getData(unsigned int i, unsigned int j) {
	if(S.size() < j){ return -1.0; }
	else{
		if(i == 0) {
			return S[j];
		}
		else if(i == 1) {
			return I[j];
		}
		else if(i == 2) {
			return R[j];
		}
		else{
			return -1.0;
		}
	}
}

int SIR::getPeriod()
{
	return total;
}

vector<vector<double>> SIR::EulerMethod(double popul, double BR, int period) {
	//fist vector S, Second I, Third R
	vector<vector<double>> result(3, vector<double>(period, 0));
	double tmpS1, tmpS2, tmpI1, tmpI2, tmpR1, tmpR2;
	int i = 0;

	tmpS1 = popul-1.0;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	while(tmpI1 > 0.7)
	{
		tmpS2 = tmpS1 + 0.01 * (0.0 - beta*tmpS1*tmpI1/popul);

		tmpI2 = tmpI1 + 0.01 * (beta*tmpS1*tmpI1/popul - gamma*tmpI1);

		tmpR2 = tmpR1 + 0.01 * (gamma*tmpI1);

		if(i % 100 == 0)
		{
			result[0].push_back( tmpS1 );
			result[1].push_back( tmpI1 );
			result[2].push_back( tmpR1 );
		}

		tmpS1 = tmpS2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
		i++;
	}

	total = i/100;
	return result;
}

vector<vector<double>> SIR::EulerMethod(double popul, double BR, double vac, int period) {
	//fist vector S, Second I, Third R
	vector<vector<double>> result(3, vector<double>(period, 0));
	double tmpS1, tmpS2, tmpI1, tmpI2, tmpR1, tmpR2;
	int i = 0;

	tmpS1 = popul-1.0;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	while(tmpI1 > 0.7)
	{
		tmpS2 = tmpS1 + 0.01 * (0.0 - beta*tmpS1*tmpI1/popul - vac * tmpS1);

		tmpI2 = tmpI1 + 0.01 * (beta*tmpS1*tmpI1/popul - gamma*tmpI1);

		tmpR2 = tmpR1 + 0.01 * (gamma*tmpI1 + vac * tmpS1);

		if(i % 100 == 0)
		{
			result[0].push_back( tmpS1 );
			result[1].push_back( tmpI1 );
			result[2].push_back( tmpR1 );
		}

		tmpS1 = tmpS2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
		i++;
	}

	total = i/100;
	return result;
}

vector<vector<double>> euler_method_SIR(double popul, 
					double BR, 
					double b,
					double r,
					int period) 
{
	//fist vector S, Second I, Third R
	vector<vector<double>> result(3, vector<double>(period, 0));
	double tmpS1, tmpS2, tmpI1, tmpI2, tmpR1, tmpR2;

	tmpS1 = popul-1;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	for( int i = 0; i < 100*(period-1)+1; i++){
		tmpS2 = tmpS1 + 0.01 * (0.0 - b*tmpS1*tmpI1/popul);

		tmpI2 = tmpI1 + 0.01 * (b*tmpS1*tmpI1/popul - r*tmpI1);

		tmpR2 = tmpR1 + 0.01 * (r*tmpI1);
		if (i % 100 == 0) {
			result[0][i / 100] = tmpS1;
			result[1][i / 100] = tmpI1;
			result[2][i / 100] = tmpR1;
		}

		tmpS1 = tmpS2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
	}

	return result;
}

vector<vector<double>> euler_method_SIR(double popul, 
					double BR, 
					double b,
					double r,
					double vaccine,
					int period) {
	//fist vector S, Second I, Third R
	vector<vector<double>> result(3, vector<double>(period, 0));
	double tmpS1, tmpS2, tmpI1, tmpI2, tmpR1, tmpR2;

	tmpS1 = popul-1;
	tmpI1 = 1.0;
	tmpR1 = 0.0;

	for( int i = 0; i < 100*(period-1)+1; i++){
		tmpS2 = tmpS1 + 0.01 * (0.0 - b*tmpS1*tmpI1/popul - vaccine*tmpS1);

		tmpI2 = tmpI1 + 0.01 * (b*tmpS1*tmpI1/popul - r*tmpI1);

		tmpR2 = tmpR1 + 0.01 * (r*tmpI1 + vaccine*tmpS1);
	
		if(i % 100 == 0)
		{
			result[0][i/100] = tmpS1;
			result[1][i/100] = tmpI1;
			result[2][i/100] = tmpR1;
		}

		tmpS1 = tmpS2;
		tmpI1 = tmpI2;
		tmpR1 = tmpR2;
	}

	return result;
}

vector<double> SIR::lsqcurvfit(double popul, double BR,
				double gam,
				vector<double> ini,	
				vector<double> Idata) {
	Matrix B = Matrix(1,1);
	vector<double> result(1,1);
	B.setElement(0,0, ini[0]);
	double dt = 0.0000000001;

	for(int i = 0; i < 3000; i++) {
		Matrix Jacob = Matrix(0,0);
		Matrix Residu = Matrix(0,0);
		Matrix tmp = Matrix(0,0);
		vector<vector<double>> sol(0,vector<double>(0));
		vector<double> tempB1(0);
		vector<double> tempB2(0);
		vector<double> tempG1(0);
		vector<double> tempG2(0);

		tempB1 = get_residue_SIR(popul, BR, B.getElement(0, 0), gam , 0.0, Idata);
		tempB2 = get_residue_SIR(popul, BR, B.getElement(0, 0), gam , dt, Idata);
		for (unsigned int i = 0; i < tempB1.size(); i++) {
			tempB1[i] = tempB1[i] - tempB2[i];
		}

		Jacob.pushBack(tempB1);
		
		sol = euler_method_SIR(popul, BR, B.getElement(0,0), gam, Idata.size());
		
		for (unsigned int i = 0; i < sol.size(); i++) {
			sol[1][i] = Idata[i] - sol[1][i];
		}

		Residu.pushBack(sol[1]);

		for(unsigned int i = 0; i < Jacob.getRow(); i++) {
			for(unsigned int j = 0; j < Jacob.getCol(); j++) {
				Jacob.setElement(i,j, Jacob.getElement(i,j)/dt);
			}
		}

		tmp = Jacob;
		tmp = tmp*Jacob.transposing();
		tmp = tmp.inverse();
		tmp = tmp * Jacob;
		tmp = tmp * Residu.transposing();
		
		B = B - tmp;
	}	
	result[0] = B.getElement(0,0);

	return result;	
}

vector<double> SIR::lsqcurvfit(double popul, double BR,
				double vac,
				double gam,
				vector<double> ini,	
				vector<double> Idata) {
	Matrix B = Matrix(1,1);
	vector<double> result(1,1);
	B.setElement(0,0, ini[0]);
	double dt = 0.0000000001;

	for(int i = 0; i < 10; i++) {
		Matrix Jacob = Matrix(0,0);
		Matrix Residu = Matrix(0,0);
		Matrix tmp = Matrix(0,0);
		vector<vector<double>> sol(0,vector<double>(0));
		vector<double> tempB1(0);
		vector<double> tempB2(0);
		vector<double> tempG1(0);
		vector<double> tempG2(0);

		tempB1 = get_residue_SIR(popul, BR, B.getElement(0, 0), gam, vac, 0.0, Idata);
		tempB2 = get_residue_SIR(popul, BR, B.getElement(0, 0), gam, vac, dt, Idata);
		for (unsigned int i = 0; i < tempB1.size(); i++) {
			tempB1[i] = tempB1[i] - tempB2[i];
		}

		Jacob.pushBack(tempB1);
		
		sol = euler_method_SIR(popul, BR, B.getElement(0,0), gam, vac, Idata.size());
		
		for (unsigned int i = 0; i < sol.size(); i++) {
			sol[1][i] = Idata[i] - sol[1][i];
		}

		Residu.pushBack(sol[1]);

		for(unsigned int i = 0; i < Jacob.getRow(); i++) {
			for(unsigned int j = 0; j < Jacob.getCol(); j++) {
				Jacob.setElement(i,j, Jacob.getElement(i,j)/dt);
			}
		}

		tmp = Jacob;
		tmp = tmp*Jacob.transposing();
		tmp = tmp.inverse();
		tmp = tmp * Jacob;
		tmp = tmp * Residu.transposing();
		
		B = B - tmp;
	}	
	result[0] = B.getElement(0,0);

	return result;	
}

vector<double> get_residue_SIR(double popul, double BR,
	       			double b,
				double r,	
				double betaDef, 
				vector<double> Idata) {
	vector<double> result(Idata.size(), 0);
	vector<vector<double>> model = euler_method_SIR(popul, BR, b-betaDef, r, Idata.size());
	
	for(unsigned int i = 0; i < result.size(); i++) {
		result[i] = model[1][i];
	}

	for(unsigned int i = 0; i < result.size(); i++) {
		result[i] = Idata[i] - result[i];
	}
	
	return result;
}

vector<double> get_residue_SIR(double popul, double BR,
	       			double b,
				double r,
				double vac,	
				double betaDef, 
				vector<double> Idata) {
	vector<double> result(Idata.size(), 0);
	vector<vector<double>> model = euler_method_SIR(popul, BR, b-betaDef, r, vac, Idata.size());
	
	for(unsigned int i = 0; i < result.size(); i++) {
		result[i] = model[1][i];
	}

	for(unsigned int i = 0; i < result.size(); i++) {
		result[i] = Idata[i] - result[i];
	}
	
	return result;
}

#endif
