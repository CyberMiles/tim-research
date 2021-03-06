//First draft of CyberMiles custom data type
//Next iteration is to move into generic templates

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
		//TODO make this pure virtual so that the class which inherits it can execute its own destructor
		~CyberMilesVector();
		//functions
		void push_back(int);
		int size();
		int getMemorySize();
		int operator[](int);
		int at(int i);
		//TODO create deep copy constructor
		//TODO create de-duplication method
		//TODO create return unique values only method
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
	if(vectorSize + 1 > memorySize)
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

int CyberMilesVector::getMemorySize(){
	return memorySize;
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
	for(int i = 0; i < 100; i++){
		vec.push_back(i);
		std::cout << "Allocated memory size at element " << i << " is " << vec.getMemorySize() << std::endl;
	}

	for(int i = 0; i < vec.size(); i++){
		std::cout << "Vector position " << i << " holds a value of " << vec.at(i) << std::endl;
	}

	return 0;
}

/*

The above code currently returns the following

Allocated memory size at element 0 is 20
Allocated memory size at element 1 is 20
...
Allocated memory size at element 19 is 20
Allocated memory size at element 20 is 40
...
Allocated memory size at element 98 is 160
Allocated memory size at element 99 is 160
...
Vector position 0 holds a value of 0
Vector position 1 holds a value of 1
Vector position 2 holds a value of 2
Vector position 3 holds a value of 3
Vector position 4 holds a value of 4
...
Vector position 95 holds a value of 95
Vector position 96 holds a value of 96
Vector position 97 holds a value of 97
Vector position 98 holds a value of 98
Vector position 99 holds a value of 99

*/
