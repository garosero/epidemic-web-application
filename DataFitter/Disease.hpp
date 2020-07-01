#ifndef _DISEASE_
#define _DISEASE_

#include"ProjectHeader.hpp"

using namespace std;

class Disease {
	private :
		string NAME;
		vector<double> Sdata;
		vector<double> Idata;
		vector<double> Rdata;
		SIR m;
		SEIR M;
	public : 
		Disease(string country_name, 
			string disease_name,
		      	bool exposed,
			bool vaccine,
			double popul, double BR);	
};

string getCasesQuery(string C_name, string D_name);
string getParamsQuery(string C_name, string D_name);
string getDeleteQuery(string C_name, string D_name);

#endif
