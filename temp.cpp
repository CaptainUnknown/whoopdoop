#include<iostream>
#include<string>
#include<time.h>
#include<stdlib.h>
#include<fstream>
#include<chrono>
#include<thread>
using namespace std;

bool Toss(){
    srand(time(NULL));
	int toss = rand()%2 + 0;;
	if(toss == 0){
		cout<<"Team A won the Toss and elected Batting.." << endl;
        return true;
	}
	else if (toss == 1){
		cout<<"Team B won the Toss and elected Batting.." << endl;
        return false;
	}
}

void BattingA(string teamA[11],
             int totalScoreA,
             int playerScoreA[11],
             int maidenA[11], 
             int foursA[11], 
             int sixesA[11],
             double strikeRateA [11],
             int ballsPlayedA [11],
             int currentDuoOneIndexA, 
             int currentDuoTwoIndexA, 
             int tempCurrentBatterIndexA,
             int outPlayersA,
             int bowlersMaidenB[11],
             int currentBowlerIndexB,
             int bowlersRunsB[11],
             int bowlersWicketsB[11]){
    srand(time(0));    
    int tempMaiden = 0;
    int tempCurrentScore = 0;

    if (currentDuoOneIndexA >= 6){
        bool isOut = (rand() % 100) < 10;
        if (isOut){
            cout << "Player " << teamA[currentDuoOneIndexA] << " is out!" << endl;
            outPlayersA++;
            currentDuoOneIndexA++;
            cout << teamA[currentDuoOneIndexA] << " is now OUT!" << endl;
            currentDuoOneIndexA = currentDuoTwoIndexA;
            currentDuoTwoIndexA =+ 1;
            tempCurrentBatterIndexA =+ 1;
            bowlersWicketsB[currentBowlerIndexB]++;            
            cout << teamA[currentDuoOneIndexA] << " will now be on Pitch" << endl;
            return;
        }

        tempCurrentScore = rand()%6 - 0;
        bowlersRunsB[currentBowlerIndexB] += tempCurrentScore;
    }
    else{
        bool isOut = (rand() % 100) < 5;
        if (isOut){
            cout << "Player " << teamA[currentDuoOneIndexA] << " is out!" << endl;
            outPlayersA++;
            currentDuoOneIndexA++;
            cout << teamA[currentDuoOneIndexA] << " is now OUT!" << endl;
            currentDuoOneIndexA = currentDuoTwoIndexA;
            currentDuoTwoIndexA =+ 1;
            tempCurrentBatterIndexA =+ 1;
            bowlersWicketsB[currentBowlerIndexB]++;
            cout << teamA[currentDuoOneIndexA] << " will now be on Pitch" << endl;
            return;
        }
        tempCurrentScore = rand()%6 - 0;
        bowlersRunsB[currentBowlerIndexB] += tempCurrentScore;
    }
    
    cout << "DEBUG: Current Score: " << tempCurrentScore << endl;
    cout << "DEBUG: Player Batted: " << teamA[currentDuoOneIndexA] << endl;

    //change the current player if the current score is odd
    if (tempCurrentScore % 2 != 0 && tempCurrentScore > 0 && tempCurrentScore != 0){
        totalScoreA += tempCurrentScore;
        playerScoreA[tempCurrentBatterIndexA] += tempCurrentScore;
        ballsPlayedA[tempCurrentBatterIndexA]++;

        strikeRateA[tempCurrentBatterIndexA] = (playerScoreA[tempCurrentBatterIndexA] / ballsPlayedA[tempCurrentBatterIndexA]) * 100;
        
        cout << "DEBUG: Now Current Player: " << teamA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Player Score: " << playerScoreA[tempCurrentBatterIndexA] << endl; 
        cout << "DEBUG: Balls Played: " << ballsPlayedA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Strike Rate: " << strikeRateA[tempCurrentBatterIndexA] << endl;
        
        int temp = currentDuoOneIndexA;
        currentDuoOneIndexA = currentDuoTwoIndexA;
        currentDuoTwoIndexA = temp;
        tempCurrentBatterIndexA = currentDuoOneIndexA;
    }
    if (tempCurrentScore % 2 == 0 && tempCurrentScore > 0 && tempCurrentScore != 4 && tempCurrentScore != 6 && tempCurrentScore != 0){
        cout << "DEBUG: Condition" << (tempCurrentScore % 2 == 0 && tempCurrentScore != -1 && tempCurrentScore != 4 && tempCurrentScore != 6) << endl;
        totalScoreA += tempCurrentScore;
        playerScoreA[tempCurrentBatterIndexA] += tempCurrentScore;
        ballsPlayedA[tempCurrentBatterIndexA] =+ 1;

        strikeRateA[tempCurrentBatterIndexA] = (playerScoreA[tempCurrentBatterIndexA] / ballsPlayedA[tempCurrentBatterIndexA]) * 100;

        cout << "DEBUG: Current Player: " << teamA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Player Score: " << playerScoreA[tempCurrentBatterIndexA] << endl; 
        cout << "DEBUG: Balls Played: " << ballsPlayedA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Strike Rate: " << strikeRateA[tempCurrentBatterIndexA] << endl;
    }
    if (tempCurrentScore == 0 && tempCurrentScore != -1){
        tempMaiden++;
        if (tempMaiden == 6){
            tempMaiden = 0;
            maidenA[tempCurrentBatterIndexA]++;    
            bowlersMaidenB[currentBowlerIndexB]++;
        }

        cout << "DEBUG: Maiden: " << tempMaiden << endl;
        cout << "DEBUG: Player Maiden: " << maidenA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Player Score: " << playerScoreA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Strike Rate: " << strikeRateA[tempCurrentBatterIndexA] << endl;
    }
    if (tempCurrentScore == 4 && tempCurrentScore != -1 && tempCurrentScore != 0){
        foursA[tempCurrentBatterIndexA]++;
        strikeRateA[tempCurrentBatterIndexA] = (playerScoreA[tempCurrentBatterIndexA] / ballsPlayedA[tempCurrentBatterIndexA]) * 100;

        cout << "DEBUG: Fours: " << foursA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Player Score: " << playerScoreA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Strike Rate" << strikeRateA[tempCurrentBatterIndexA] << endl;
    }
    if (tempCurrentScore == 6 && tempCurrentScore != -1 && tempCurrentScore != 0){
        sixesA[tempCurrentBatterIndexA]++;
        strikeRateA[tempCurrentBatterIndexA] = (playerScoreA[tempCurrentBatterIndexA] / ballsPlayedA[tempCurrentBatterIndexA]) * 100;

        cout << "DEBUG: Sixes: " << sixesA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Player Score: " << playerScoreA[tempCurrentBatterIndexA] << endl;
        cout << "DEBUG: Strike Rate" << strikeRateA[tempCurrentBatterIndexA] << endl;
    }
}

void BattingB(string teamB[11],
             int totalScoreB,
             int playerScoreB[11],
             int maidenB[11], 
             int foursB[11], 
             int sixesB[11],
             double strikeRateB [11],
             int ballsPlayedB [11],
             int currentDuoOneIndexB, 
             int currentDuoTwoIndexB, 
             int tempCurrentBatterIndexB,
             int outPlayersB,
             int bowlersMaidenA[11],
             int currentBowlerIndexA,
             int bowlersRunsA[11],
             int bowlersWicketsA[11]){
    srand(time(0));    
    int tempMaiden = 0;
    int tempCurrentScore = 0;

    if (currentDuoOneIndexB >= 6){
        bool isOut = (rand() % 100) < 10;
        if (isOut){
            cout << "Player " << teamB[currentDuoOneIndexB] << " is out!" << endl;
            outPlayersB++;
            currentDuoOneIndexB++;
            cout << teamB[currentDuoOneIndexB] << " is now OUT!" << endl;
            currentDuoOneIndexB = currentDuoTwoIndexB;
            currentDuoTwoIndexB =+ 1;
            tempCurrentBatterIndexB =+ 1;
            bowlersWicketsA[currentBowlerIndexA]++;            
            cout << teamB[currentDuoOneIndexB] << " will now be on Pitch" << endl;
            return;
        }

        tempCurrentScore = rand()%6 - 0;
        bowlersRunsA[currentBowlerIndexA] += tempCurrentScore;
    }
    else{
        bool isOut = (rand() % 100) < 5;
        if (isOut){
            cout << "Player " << teamB[currentDuoOneIndexB] << " is out!" << endl;
            outPlayersB++;
            currentDuoOneIndexB++;
            cout << teamB[currentDuoOneIndexB] << " is now OUT!" << endl;
            currentDuoOneIndexB = currentDuoTwoIndexB;
            currentDuoTwoIndexB =+ 1;
            tempCurrentBatterIndexB =+ 1;
            bowlersWicketsA[currentBowlerIndexA]++;
            cout << teamB[currentDuoOneIndexB] << " will now be on Pitch" << endl;
            return;
        }
        tempCurrentScore = rand()%6 - 0;
        bowlersRunsA[currentBowlerIndexA] += tempCurrentScore;
    }
    
    cout << "DEBUG: Current Score: " << tempCurrentScore << endl;
    cout << "DEBUG: Player Batted: " << teamB[currentDuoOneIndexB] << endl;

    //change the current player if the current score is odd
    if (tempCurrentScore % 2 != 0 && tempCurrentScore > 0 && tempCurrentScore != 0){
        totalScoreB += tempCurrentScore;
        playerScoreB[tempCurrentBatterIndexB] += tempCurrentScore;
        ballsPlayedB[tempCurrentBatterIndexB]++;

        strikeRateB[tempCurrentBatterIndexB] = (playerScoreB[tempCurrentBatterIndexB] / ballsPlayedB[tempCurrentBatterIndexB]) * 100;
        
        cout << "DEBUG: Now Current Player: " << teamB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Player Score: " << playerScoreB[tempCurrentBatterIndexB] << endl; 
        cout << "DEBUG: Balls Played: " << ballsPlayedB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Strike Rate: " << strikeRateB[tempCurrentBatterIndexB] << endl;
        
        int temp = currentDuoOneIndexB;
        currentDuoOneIndexB = currentDuoTwoIndexB;
        currentDuoTwoIndexB = temp;
        tempCurrentBatterIndexB = currentDuoOneIndexB;
    }
    if (tempCurrentScore % 2 == 0 && tempCurrentScore > 0 && tempCurrentScore != 4 && tempCurrentScore != 6 && tempCurrentScore != 0){
        cout << "DEBUG: Condition" << (tempCurrentScore % 2 == 0 && tempCurrentScore != -1 && tempCurrentScore != 4 && tempCurrentScore != 6) << endl;
        totalScoreB += tempCurrentScore;
        playerScoreB[tempCurrentBatterIndexB] += tempCurrentScore;
        ballsPlayedB[tempCurrentBatterIndexB] =+ 1;

        strikeRateB[tempCurrentBatterIndexB] = (playerScoreB[tempCurrentBatterIndexB] / ballsPlayedB[tempCurrentBatterIndexB]) * 100;

        cout << "DEBUG: Current Player: " << teamB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Player Score: " << playerScoreB[tempCurrentBatterIndexB] << endl; 
        cout << "DEBUG: Balls Played: " << ballsPlayedB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Strike Rate: " << strikeRateB[tempCurrentBatterIndexB] << endl;
    }
    if (tempCurrentScore == 0 && tempCurrentScore != -1){
        tempMaiden++;
        if (tempMaiden == 6){
            tempMaiden = 0;
            maidenB[tempCurrentBatterIndexB]++;    
            bowlersMaidenA[currentBowlerIndexA]++;
        }

        cout << "DEBUG: Maiden: " << tempMaiden << endl;
        cout << "DEBUG: Player Maiden: " << maidenB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Player Score: " << playerScoreB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Strike Rate: " << strikeRateB[tempCurrentBatterIndexB] << endl;
    }
    if (tempCurrentScore == 4 && tempCurrentScore != -1 && tempCurrentScore != 0){
        foursB[tempCurrentBatterIndexB]++;
        strikeRateB[tempCurrentBatterIndexB] = (playerScoreB[tempCurrentBatterIndexB] / ballsPlayedB[tempCurrentBatterIndexB]) * 100;

        cout << "DEBUG: Fours: " << foursB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Player Score: " << playerScoreB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Strike Rate" << strikeRateB[tempCurrentBatterIndexB] << endl;
    }
    if (tempCurrentScore == 6 && tempCurrentScore != -1 && tempCurrentScore != 0){
        sixesB[tempCurrentBatterIndexB]++;
        strikeRateB[tempCurrentBatterIndexB] = (playerScoreB[tempCurrentBatterIndexB] / ballsPlayedB[tempCurrentBatterIndexB]) * 100;

        cout << "DEBUG: Sixes: " << sixesB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Player Score: " << playerScoreB[tempCurrentBatterIndexB] << endl;
        cout << "DEBUG: Strike Rate" << strikeRateB[tempCurrentBatterIndexB] << endl;
    }
}

//define a function to display the innings of teamA
void displayInningsA()
{
}

void InningA()
{
}

void InningB()
{
}

void scoreboardTableA(string teamA[11],int playerScoreA[11],int ballsPlayedA [11],int foursA[11],int sixesA[11],int maidenA[11],double strikeRateA [11]){
    cout << "Team A Scoreboard" << endl;
    cout << "==========================================================================================================================" << endl;
    cout << "Player Name" << "\t" << "Score" << "\t" << "Balls" << "\t" << "Fours" << "\t" << "Sixes" << "\t" << "Maiden" << "\t" << "Strike Rate" << endl;
    for (int i = 0; i < 11; i++){
        cout << teamA[i] << "\t" << playerScoreA[i] << "\t" << ballsPlayedA[i] << "\t" << foursA[i] << "\t" << sixesA[i] << "\t" << maidenA[i] << "\t" << strikeRateA[i] << endl;
    }
    cout << "==========================================================================================================================" << endl;
}
void scoreboardTableB(string teamB[11],int playerScoreB[11],int ballsPlayedB [11],int foursB[11],int sixesB[11],int maidenB[11],double strikeRateB [11]){
    //Draw the Score board for team B
    cout << "Team B Scoreboard" << endl;
    cout << "==========================================================================================================================" << endl;
    cout << "Player Name" << "\t" << "Score" << "\t" << "Balls" << "\t" << "Fours" << "\t" << "Sixes" << "\t" << "Maiden" << "\t" << "Strike Rate" << endl;
    for(int i=0;i<11;i++){
        cout<<teamB[i]<<"||\t\t"<<playerScoreB[i]<<"\t\t"<<ballsPlayedB[i]<<"\t\t"<<foursB[i]<<"\t\t"<<sixesB[i]<<"\t\t"<<maidenB[i]<<"\t\t"<<strikeRateB[i] << "||";
        cout<<endl;
    }
    cout << "==========================================================================================================================" << endl;
}

void saveData(string teamA[11], 
            int playerScoreA[11], 
            int ballsPlayedA[11],
            int foursA[11], 
            int sixesA[11],
            int maidenA[11], 
            double strikeRateA[11],
            string teamB[11], 
            int playerScoreB[11], 
            int ballsPlayedB[11],
            int foursB[11], 
            int sixesB[11],
            int maidenB[11], 
            double strikeRateB[11]){//ADD PARAMETERS
    ofstream myfile;
    myfile.open("data.txt");
    myfile << "Team A" << endl;
    myfile << "Player Name" << "\t" << "Player Score" << "\t" << "Balls Played" << "\t" << "Fours" << "\t" << "Sixes" << "\t" << "Maiden" << "\t" << "Strike Rate" << endl;
    for(int i=0;i<11;i++){
        myfile << teamA[i] << "\t" << playerScoreA[i] << "\t" << ballsPlayedA[i] << "\t" << foursA[i] << "\t" << sixesA[i] << "\t" << maidenA[i] << "\t" << strikeRateA[i] << endl;
    }
    myfile << "Team B" << endl;
    myfile << "Player Name" << "\t" << "Player Score" << "\t" << "Balls Played" << "\t" << "Fours" << "\t" << "Sixes" << "\t" << "Maiden" << "\t" << "Strike Rate" << endl;
    for(int i=0;i<11;i++){
        myfile << teamB[i] << "\t" << playerScoreB[i] << "\t" << ballsPlayedB[i] << "\t" << foursB[i] << "\t" << sixesB[i] << "\t" << maidenB[i] << "\t" << strikeRateB[i] << endl;
    }
    myfile.close();
}


int main()
{
	ifstream in("configuration.txt");
	int overs;
	in >> overs;
	in.close();

	string teamA[11]={"Rizwan","Babar","F Zaman","Hafeez","S Malik","Asif Ali","Imad wasim","Shadab Khan","Hassan ALi","Haris Rauf","Shaheen Afridi"};
    string teamB[11]={"Rizwan2","Babar2","F Zaman2","Hafeez2","S Malik2","Asif Ali2","Imad wasim2","Shadab Khan2","Hassan ALi2","Haris Rauf2","Shaheen Afridi2"};
	int totalScoreA=0;
    int totalScoreB=0;
	int playerScoreA[11] = {0, 0, 0,};
    int playerScoreB[11] = {0, 0, 0,};
	//int balls = overs * 6;
    int balls = 12;
	bool toss;
	int maidenA[11] = {0, 0, 0,};
	int foursA[11] = {0, 0, 0,};
	int sixesA[11] = {0, 0, 0,};

    int maidenB[11] = {0, 0, 0,};
	int foursB[11] = {0, 0, 0,};
	int sixesB[11] = {0, 0, 0,};

    double strikeRateA [11] = {0, 0, 0,};
    double strikeRateB [11] = {0, 0, 0,};

    int ballsPlayedA [11] = {0, 0, 0,};
    int ballsPlayedB [11] = {0, 0, 0,};

    int currentDuoOneIndexA = 0;
    int currentDuoTwoIndexA = 1;
    int tempCurrentBatterIndexA = 0;
    
    int currentDuoOneIndexB = 0;
    int currentDuoTwoIndexB = 1;
    int tempCurrentBatterIndexB = 0;

    int outPlayersA = 0;
    int outPlayersB = 0;

    int currentBowlerIndexA = 5; //teamA[currentBowlerIndexA] is the current bowler
    int currentBowlerIndexB = 5; //teamB[currentBowlerIndexB] is the current bowler

    int bowlerOversA[11] = {0};
    int bowlerOversB[11] = {0};

    int bowlersMaidenA[11] = {0};
    int bowlersMaidenB[11] = {0};

    int bowlersRunsA[11] = {0};
    int bowlersRunsB[11] = {0};

    int bowlersWicketsA[11] = {0};
    int bowlersWicketsB[11] = {0};

    int bowlersEconomyA[11] = {0};
    int bowlersEconomyB[11] = {0};
    
    cout << "------------------------------------------------------" << endl;
    cout << "| ================ CRICKET-LEAQUE ================== |"<< endl;
    cout << "|                                                    |" << endl;
    cout << "|          Welcome to Virtual Cricket Game           |" << endl;
    cout << "------------------------------------------------------" << endl;

	cout<<"                                            "<<endl;

	toss = Toss();

    if (toss){
        cout << "Team A is batting.." << endl;
        cout << "\n" << endl;
        int ballCounter = 0;
        for (int i = 0; i <= balls; i++){//First Innings
            // call BattingA function
            cout << "Enter to bowl" << endl;
            cin.get();
            //system("CLS");
            
            //call BattingA function
            BattingA(teamA, totalScoreA, playerScoreA, maidenA, foursA, sixesA, strikeRateA, ballsPlayedA, currentDuoOneIndexA, currentDuoTwoIndexA, tempCurrentBatterIndexA, outPlayersA, bowlersMaidenB, currentBowlerIndexB, bowlersRunsB, bowlersWicketsA);
            ballCounter--;
			//scoreboardTableA( teamA, playerScoreA,ballsPlayedA, foursA,sixesA,maidenA,strikeRateA);
            if (ballCounter%6 == 0){
                bowlerOversB[currentBowlerIndexB] =+ 1;
                currentBowlerIndexB++;
                if (currentBowlerIndexB == 11){
                    currentBowlerIndexB = 0;
                }
                bowlersEconomyB[currentBowlerIndexB] = bowlersRunsB[currentBowlerIndexB] / bowlerOversB[currentBowlerIndexB];
            }
        }
        if(ballCounter){//second Inings
            cout << "Team B is batting.." << endl;
            cout << "\n" << endl;
            for (int i = 0; i <= balls; i++){
                // call BattingB function
                cout << "Enter to bowl" << endl;
                cin.get();
                //system("CLS");
                //BattingB(teamB, totalScoreB, playerScoreB, maidenB, foursB, sixesB, strikeRateB, ballsPlayedB, currentDuoOneIndexB, currentDuoTwoIndexB, tempCurrentBatterIndexB, outPlayersB, bowlersMaidenA, currentBowlerIndexA, bowlersRunsA, bowlersWicketsA);
                if (ballCounter%6 == 0){
                    bowlerOversA[currentBowlerIndexA] =+ 1;
                    currentBowlerIndexA++;
                    if (currentBowlerIndexA == 11){
                        currentBowlerIndexA = 0;
                    }
                    bowlersEconomyA[currentBowlerIndexA] = bowlersRunsA[currentBowlerIndexA] / bowlerOversA[currentBowlerIndexA];
                }
            }
        }
    }
    else{
        cout << "Team B is batting.." << endl;
        cout << "\n" << endl;

        int ballCounter = 0;

        for (int i = 0; i <= balls; i++){//First Innings
            // call BattingB function
            cout << "Enter to bowl" << endl;
            cin.get();
            //system("CLS");
            // BattingB(teamB, totalScoreB, playerScoreB, maidenB, foursB, sixesB, strikeRateB, ballsPlayedB, currentDuoOneIndexB, currentDuoTwoIndexB, tempCurrentBatterIndexB, outPlayersB, bowlersMaidenA, currentBowlerIndexA, bowlersRunsA, bowlersWicketsA);
            //scoreboardTableB( teamB, playerScoreB,ballsPlayedB, foursB,sixesB,maidenB,strikeRateB);
            ballCounter--;
            if (ballCounter%6 == 0){
                bowlerOversA[currentBowlerIndexA] =+ 1;
                currentBowlerIndexA++;
                if (currentBowlerIndexA == 11){
                    currentBowlerIndexA = 0;
                }
                bowlersEconomyA[currentBowlerIndexA] = bowlersRunsA[currentBowlerIndexA] / bowlerOversA[currentBowlerIndexA];
            }
        }
        if(ballCounter == 0){//second Inings
            cout << "Team A is batting.." << endl;
            cout << "\n" << endl;
            for (int i = 0; i <= balls; i++){
                // call BattingA function
                cout << "Enter to bowl" << endl;
                cin.get();
                //system("CLS");
                BattingA(teamA, totalScoreA, playerScoreA, maidenA, foursA, sixesA, strikeRateA, ballsPlayedA, currentDuoOneIndexA, currentDuoTwoIndexA, tempCurrentBatterIndexA, outPlayersA, bowlersMaidenB, currentBowlerIndexB, bowlersRunsB, bowlersWicketsA);
                if (ballCounter%6 == 0){
                    bowlerOversB[currentBowlerIndexB] =+ 1;
                    currentBowlerIndexB++;
                    if (currentBowlerIndexB == 11){
                        currentBowlerIndexB = 0;
                    }
                    bowlersEconomyB[currentBowlerIndexB] = bowlersRunsB[currentBowlerIndexB] / bowlerOversB[currentBowlerIndexB];
                }
            }
        }
    }

    int option;
    cout << "Please select an option: " << endl;
    cout << "1. Display First Innings" << endl;
    cout << "2. Display Second Innings" << endl;
    cout << "3. Save Match Data" << endl;
    cout << "4. Exit" << endl;

    cin >> option;
    switch (option)
    {
    case 1:
        cout << "First Innings" << endl;
        if(toss){
            InningA(); //ADD PARAMETERS
        }
        else{
            InningB();
        }
        break;
    case 2:
        cout << "Second Innings" << endl;
        if(toss){
            InningB();
        }
        else{
            InningA();
        }
        break;
    case 3:
        cout << "Save Match Data" << endl;

        //call saveData function
        saveData(teamA, playerScoreA, ballsPlayedA, foursA, sixesA, maidenA, strikeRateA, teamB, playerScoreB, ballsPlayedB, foursB, sixesB, maidenB, strikeRateB);
        break;
    case 4:
        cout << "Program will now exit..." << endl;
        this_thread::sleep_for(chrono::seconds(3));
        exit(0);
        break;
    default:
        break;
    }


    //============================= Results ===============================
    //bowler of the match
    for (int i = 0; i < 11; i++){//Team A   
        int tempIndex = i;
        int tempLargest = bowlersWicketsA[i];
        if (bowlersWicketsA[i] >= tempLargest ){
            tempIndex = i;
        }
        cout << "Bowler of th match: " << teamA[tempIndex] << endl;
    }
    for (int i = 0; i < 11; i++){//Team B
        int tempIndex = i;
        int tempLargest = bowlersWicketsB[i];
        if (bowlersWicketsB[i] >= tempLargest ){
            tempIndex = i;
        }
        cout << "Bowler of th match: " << teamB[tempIndex] << endl;
    }

    //batsman of the match
    for (int i = 0; i < 11; i++){//Team A   
        int tempIndex = i;
        int tempLargest = playerScoreA[i];
        if (playerScoreA[i] >= tempLargest ){
            tempIndex = i;
        }
        cout << "Batsman of the match: " << teamA[tempIndex] << endl;
    }
    for (int i = 0; i < 11; i++){//Team B
        int tempIndex = i;
        int tempLargest = playerScoreB[i];
        if (playerScoreB[i] >= tempLargest ){
            tempIndex = i;
        }
        cout << "Batsman of the match: " << teamB[tempIndex] << endl;
    }

    if(totalScoreA > totalScoreB){
        cout << "Team A is the winner" << endl;
    }
    else if(totalScoreA < totalScoreB){
        cout << "Team B is the winner" << endl;
    }
    else{
        cout << "Match is a draw" << endl;
    }

return 0;	
}