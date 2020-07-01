#ifndef _COUNTRY_
#define _COUNTRY_

#include"ProjectHeader.hpp"

class Country {
	private :
		string NAME;
		double population;
		double BirthRate;
		vector<Disease> Dis;
	public : 
		Country(string country_Code, double popu);
};

#endif
