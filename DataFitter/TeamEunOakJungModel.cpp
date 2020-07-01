#include"ProjectHeader666666.hpp"

TeamEunOakJungModel::TeamEunOakJungModel(double popul,
			double tau,
			double delta,
			double exposed,
			double alpha,
			double gam,
			vector<double> Sdata,
			vector<double> Idata,
			vector<double> Rdata,
			vector<double> ini)
{
	vector<double> v = lsqcurvfit(popul, tau, delta, exposed, alpha, gam, ini, Idata);
	vector<vector<double>> tmp;
	Beta  = v[0];
	Betaf = v[1];
	Kappa = exposed;
	Alpha = alpha;
	Gamma = gam;

	tmp = EulerMethod(popul, 0.0);

	S = tmp[0];
	Sf = tmp[1];
	E = tmp[2];
	I = tmp[3];
	Q = tmp[4];
	R = tmp[5];
}
double TeamEunOakJungModel::getData(unsigned int i, unsigned int j)
{
	if (S.size() < j) { return -1; }
	else
	{
		if (i == 0)
		{
			return S[j];
		}
		else if (i == 1)
		{
			return Sf[j];
		}
		else if (i == 2)
		{
			return E[j];
		}
		else if (i == 3)
		{
			return I[j];
		}
		else if (i == 4)
		{
			return Q[j];
		}
		else if (i == 5)
		{
			return R[j];
		}
		return -1;
	}
}
int TeamEunOakJungModel::getPeriod() { return total; }

vector<vector<double>> TeamEunOakJungModel::EulerMethod(double popul, double BR)
{	
	vector<vector<double>> result(6, vector<double>(0 ,0));
	double tmpS1 = 0.0, tmpS2 = 0.0;
	double tmpSf1 = 0.0, tmpSf2 = 0.0;
	double tmpE1 = 0.0, tmpE2 = 0.0;
	double tmpI1 = 0.0, tmpI2 = 0.0;
	double tmpQ1 = 0.0, tmpQ2 = 0.0;
	double tmpR1 = 0.0, tmpR2 = 0.0;

	tmpS1 = popul -1;
	tmpI1 = 1.0;

	while(tmpQ1 < 1.0)
	{
		tmpS2 = tmpS1 + 0.01 * (-Beta * tmpS1 * tmpI1 / popul - Betaf * (1 - exp(Tau * tmpQ1)) * tmpS1);
		tmpSf2 = tmpSf1 + 0.01 * (Betaf * (1 - exp(Tau * tmpQ1)) - Delta * Beta * tmpSf1 * tmpI1 / popul);
		tmpE2 = tmpE1 + 0.01 * (Beta * tmpS1 * tmpI1 / popul + Delta * Beta * tmpSf1 * tmpI1 / popul - Kappa * tmpE1);
		tmpI2 = tmpI1 + 0.01 * (Kappa * tmpE1 - Alpha * tmpI1);
		tmpQ2 = tmpQ1 + 0.01 * (Alpha * tmpI1 - Gamma * tmpQ1);
		tmpR2 = tmpR1 + 0.01 * (Gamma * tmpQ1);

		if (i % 100 == 0)
		{
			result[0].push_back( tmpS1 );
			result[1].push_back( tmpSf1 );
			result[2].push_back( tmpE1 );
			result[3].push_back( tmpI1 );
			result[4].push_back( tmpQ1 );
			result[5].push_back( tmpR1 );
		}

		tmpS1 = tmpS2;
		tmpSf1 = tmpSf2;
		tmpE1 = tmpE2;
		tmpI1 = tmpI2;
		tmpQ1 = tmpQ2;
		tmpR1 = tmpR2;
	}
	
	total = i / 100;
	return result;

}

vector<double> TeamEunOakJungModel::lsqcurvfit(double popul,
			double tau,
			double delta,
			double exposed,
			double alpha,
			double gam,
			vector<double> ini,
			vector<double> Idata)
{
	Matrix B = Matrix(2, 1);
	vector<double> result(2, 0);
	B.setElement(0, 0, ini[0]);
	B.setElement(1, 0, ini[1]);
	double dt = 0.0000000001;

	for (int k = 0; k < 100; k++)
	{
		Matrix Jacob = Matrix(0, 0);
		Matrix Residu = Matrix(0, 0);
		Matrix tmp = Matrix(0, 0);
		vector<vector<double>> sol(0, vecotr<double>(0));
		vector<double> tempB1(0);
		vector<double> tempB2(0);
		vector<double> tempBf1(0);

		tempB2 = get_residue_TEOJ(popul, B.getElement(0, 0), B.getElement(1, 0), tau, delta, exposed, alpha, gam, 0.0, 0.0, Idata);
	       	tempB1 = get_residue_TEOJ(popul, B.getElement(0, 0), B.getElement(1, 0), tau, delta, exposed, alpha, gam ,dt, 0.0, Idata);
		tempBf1 = get_residue_TEOJ(popul, B.getElement(0, 0), B.getElement(1, 0), tau, delta, exposed, alpha, gam, 0.0, dt, Idata);	
		for (unsigned int i = 0; i < tempB2.size(); i++)
		{
			tempB1[i] = tempB2[i] - tempB1[i];
			tempBf1[i] = tempB2[i] - tempBf1[i];
		}

		Jacob.pushBack(tempB1);
		Jacob.pushBack(tempBf1);

		sol = euler_method_TEOJ(popul, B.getElement(0, 0), B.getElement(1, 0), tau, delta, exposed, alpha, gam, Idata.size());

		for (unsigned int i = 0; i < Idata.size(); i++)
		{
			sol[4][i] = Idata[i] - sol[4][i];
		}

		Residue.pushBack(sol[4]);

		for (unsigned int i = 0; i < Jacob.getRow(); i++)
		{
			for (unsigned int j = 0;  j < Jacob.getCol(); j++)
			{
				Jacob.setElement(i, j, Jacob.getElement(i, j) / dt);
			}
		}

		tmp = Jacob;
		tmp = tmp * Jacob.transposing();
		tmp = tmp.inverse();
		tmp = tmp * Jacob;
		tmp = tmp * Residue.transposing();

		B = B - tmp;
	}
	result[0] = B.getElement(0, 0);
	result[1] = B.getElement(1, 0);

	return result;
}

vector<double> get_residue_TEOJ(double popul,
				double beta,
				double betaf,
				double tau,
				double delta,
				double exposed,
				double alpha,
				double gam,
				double betaDef,
				double betafDef,
				vector<double> Idata)
{
	vector<double> result(Idata.size(), 0);
	vector<vector<double>> model = euler_method_TEOJ(popul, beta - betaDef, betaf - betafDef, tau, delta, exposed, alpha, gam, Idata.size());

	for (unsigned int i = 0; i < result.size(); i++) 
	{
		result[i] = model[4][i];
	}
	for (unsigned int i = 0; i < result.size(); i++)
	{
		result[i] = Idata[i] - result[i];
	}

	return result;
}

vector<vector<double>> euler_method_TEOJ(double popul,
					double beta,
					double betaf,
					double tau,
					double delta,
					double exposed,
					double alpha,
					double gam,
					int period)
{
	vector<vector<double>> result(6, vector<double>(period,0));
	double tmpS1 = 0.0, tmpS2 = 0.0;
	double tmpSf1 = 0.0, tmpSf2 = 0.0;
	double tmpE1 = 0.0, tmpE2 = 0.0;
	double tmpI1 = 0.0, tmpI2 = 0.0;
	double tmpQ1 = 0.0, tmpQ2 = 0.0;
	double tmpR1 = 0.0, tmpR2 = 0.0;

	tmpS1 = popul -1;
	tmpI1 = 1.0;

	for(int i = 0; i < 100 * (period - 1) + 1; i++)
	{
		tmpS2 = tmpS1 + 0.01 * (-beta * tmpS1 * tmpI1 / popul - betaf * (1 - exp(tau * tmpQ1)) * tmpS1);
		tmpSf2 = tmpSf1 + 0.01 * (betaf * (1 - exp(tau * tmpQ1)) - delta * beta * tmpSf1 * tmpI1 / popul);
		tmpE2 = tmpE1 + 0.01 * (beta * tmpS1 * tmpI1 / popul + delta * beta * tmpSf1 * tmpI1 / popul - exposed * tmpE1);
		tmpI2 = tmpI1 + 0.01 * (exposed * tmpE1 - alpha * tmpI1);
		tmpQ2 = tmpQ1 + 0.01 * (alpha * tmpI1 - gam * tmpQ1);
		tmpR2 = tmpR1 + 0.01 * (gam * tmpQ1);

		if (i % 100 == 0)
		{
			result[0][i / 100] = tmpS1;
			result[1][i / 100] = tmpSf1;
			result[2][i / 100] = tmpE1;
			result[3][i / 100] = tmpI1;
			result[4][i / 100] = tmpQ1;
			result[5][i / 100] = tmpR1;
		}

		tmpS1 = tmpS2;
		tmpSf1 = tmpSf2;
		tmpE1 = tmpE2;
		tmpI1 = tmpI2;
		tmpQ1 = tmpQ2;
		tmpR1 = tmpR2;
	}

	return result;
}
