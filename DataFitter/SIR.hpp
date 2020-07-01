#ifndef _SIR_
#define _SIR_

#include"ProjectHeader.hpp"

using namespace std;

class SIR {
	private :
		int total;
		double beta;
		double gamma;
		bool vaccine;
		vector<double> S;
		vector<double> I;
		vector<double> R;
	public :
		SIR( double popul, double BR,
			double gam,
			vector<double> Sdata, 
			vector<double> Idata, 
			vector<double> Rdata, 
			vector<double> ini);

		SIR( double popul, double BR,
			double gam,
			double vac,
			vector<double> Sdata, 
			vector<double> Idata, 
			vector<double> Rdata, 
			vector<double> ini);
		
		double getData(unsigned int i, unsigned int j);
		int getPeriod();

		vector<vector<double>> EulerMethod( double popul, double BR, int period);
		vector<vector<double>> EulerMethod( double popul, double BR, double vac, int period);
		vector<double> lsqcurvfit( double popul, double BR,
						double gam,
						vector<double> ini,
						vector<double> Idata );

		vector<double> lsqcurvfit( double popul, double BR,
			       			double vac,
						double gam,
						vector<double> ini,
						vector<double> Idata );
};

vector<double> get_residue_SIR(double popul, double BR,
				double b,
				double r,
				double betaDef,
				vector<double> Idata);

vector<double> get_residue_SIR(double popul, double BR,
				double b,
				double r,
				double vac,
				double betaDef,
				vector<double> Idata);

vector<vector<double>> euler_method_SIR( double popul,
					double BR,
					double b,
					double r, 
					int period );
vector<vector<double>> euler_method_SIR( double popul,
					double BR,
					double b,
					double r,
					double vaccine, 
					int period );
#endif
