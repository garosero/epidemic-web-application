#include"ProjectHeader.hpp"

class TeamEunOakJungModel {
	private :
		int total;
		double Beta;
		double Betaf;
		double Tau;
		double Delta;
		double Kappa;
		double Alpha;
		double Gamma;
		vector<double> S;
		vector<double> Sf;
		vector<double> E;
		vector<double> I;
		vector<double> Q;
		vector<double> R;
	public : 
		TeamEunOakJungModel(double popul,
					double tau,
					double delta,
					double exposed,
					double alpha,
					double gam,
					vector<double> Sdata,
					vector<double> Idata,
					vector<double> Rdata,
					vector<double> ini);

		double getData(unsigned int i, unsigned int j);
		int getPeriod();

		vector<vector<double>> EulerMethod(double popul, double BR);
		//vector<vector<double>> EulerMethod_vac(double popul, double BR, double vac);
		vector<double> lsqcurvfit(double popul,
					double tau,
					double delta,
					double exposed,
					double alpha,
					double gam,
					vector<double> ini,
					vector<double> Idata);
//		vector<double> lsqcurvfit(double popul,
//					double exposed
//					double alpah,
//					double gam,
//					double vac,
//					vector<double> ini,
//					vector<double> Idata);
};

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
				vector<double> Idata);
vector<vector<double>> euler_method_TEOJ(double popul,
					double beta,
					double betaf,
					double tau,
					double delta,
					double exposed,
					double alpha,
					double gam,
					int period);

