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
		//functions
		void push_back(int);
		int size();
		int operator[](int);
		int at(int i);
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

//TODO write a proper deep copy constructor	
//CyberMilesVector::CyberMilesVector(const CyberMilesVector){}

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

int CyberMilesVector::size(){
	return vectorSize;
}

//TODO fix this function so that it is implemented as part of the solution
int CyberMilesVector::at(int cvi){
	if(cvi < vectorSize){
		return pointerToStart[cvi];
	}else{
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
	CyberMilesVector vec;
	vec.push_back(1);
	vec.push_back(2);
	vec.push_back(3);
	for(int i = 0; i < vec.size(); i++){
		std::cout << "Vector position " << i << " holds a value of " << vec.at(i) << std::endl;
	}

	return 0;
}

/*

The above code currently returns the following

Vector position 0 holds a value of 1
Vector position 1 holds a value of 2
Vector position 2 holds a value of 3

*/