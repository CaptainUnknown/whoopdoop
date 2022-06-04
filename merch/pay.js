

//Prompts the user to transfer ERC 20 Tokens
const payBill = async () => {
    let totalBill; //CALCULATE TOTAL BILL
    const options = {
        type: "native",
        amount: Moralis.Units.ETH(totalBill),
        receiver: "0x..", //ADD OWNER ADDRESS
    };
    const transaction = await Moralis.transfer(options);
    const result = await transaction.wait(); //Waits for atleast One confirmation
}

//If successfull then redirect to Thankyou.html
const redirect = () => {
    window.location.replace("/merch/thankyou.html");
}