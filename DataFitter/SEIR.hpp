#ifndef _SEIR_
#define _SEIR_

#include"ProjectHeader.hpp"

using namespace std;

class SEIR {
private:
	int total;
	double beta;
	double exposed;
	double gamma;
	bool vaccine;
	vector<double> S;
	vector<double> E;
	vector<double> I;
	vector<double> R;
public:
	SEIR(double popul, double BR,
		double exp,
		double gam,
		vector<double> Sdata,
		vector<double> Idata,
		vector<double> Rdata,
		vector<double> ini);
	
	SEIR(double popul, double BR,
		double exp,
		double gam,
		double vac,
		vector<double> Sdata,
		vector<double> Idata,
		vector<double> Rdata,
		vector<double> ini);

	double getData(unsigned int i, unsigned int j);
	int getPeriod();
	
	vector<vector<double>> EulerMethod(double popul, double BR, int period);
	vector<vector<double>> EulerMethod_vac(double popul, double BR, double vac, int period);

	vector<double> lsqcurvfit(double popul, double BR,
		double exp,
		double gam,
		vector<double> ini,
		vector<double> Idata,
		vector<double> Sdata);

	vector<double> lsqcurvfit(double popul, double BR,
		double exp,
		double gam,
		double vac,
		vector<double> ini,
		vector<double> Idata,
		vector<double> Sdata);
};

vector<double> get_residue_SEIR(double popul, double BR,
	double b,
	double exp,
	double r,
	double betaDef,
	vector<double> Idata);

vector<double> get_residue_SEIR(double popul, double BR,
	double b,
	double exp,
	double r,
	double vac,
	double betaDef,
	vector<double> Sdata);

vector<vector<double>> euler_method_SEIR(double popul,
	double BR,
	double b,
	double exp,
	double r,
	int period);
vector<vector<double>> euler_method_SEIR(double popul,
	double BR,
	double b,
	double exp,
	double r,
	double vaccine,
	int period);
#endif
