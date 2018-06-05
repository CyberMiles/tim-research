//want it to be generic

#include <iostream>

class CyberMilesVector{
	private:
		int vectorSize;
		int memorySize;
		int* pointerToStart;
		void allocate_new_memory();
	public:
		//Constructor original
		CyberMilesVector();
		//Constructor overload
		CyberMilesVector(int);
		//Copy constructor
		CyberMilesVector(const CyberMilesVector&);
		//Destructor
		~CyberMilesVector();
		void push_back(int);
		int get_vector_size();
		int operator[](int);
		int at_position(int i);
};

CyberMilesVector::CyberMilesVector(){
	memorySize = 20;
	pointerToStart = new int[memorySize];
	vectorSize = 0;
}

CyberMilesVector::CyberMilesVector(int i){
	memorySize = i;
	pointerToStart = new int[memorySize];
	vectorSize = 0;
}
	
CyberMilesVector::CyberMilesVector(const CyberMilesVector){}

//TODO make this pure virtual so that the inheriting class can deconstruct
CyberMilesVector::~CyberMilesVector(){
	delete[] pointerToStart;
}

void CyberMilesVector::push_back(int i){
	if(vectorSize+1 > memorySize)
		allocate_new_memory();
	//TODO edit this next line again
	pointerToStart[vectorSize] = i;
	vectorSize++;
}

int CyberMilesVector::operator[](int i){
	return pointerToStart[i];
}

//TODO fix this function so that it is implemented as part of the solution
int CyberMilesVector::at(int i){
	if(i<vectorSize){
		return pointerToStart[i];
	throw 10;
	}
}

void CyberMilesVector::allocate_new_memory(){
	memorySize = vectorSize * 2;
	int* tmp = new int[memorySize];
	for(int i = 0; i < vectorSize; i++)
		tmp[i] = pointerToStart[i];
	delete[] pointerToStart;
	pointerToStart = tmp;
}
int main()
{
	
	return 0;
}