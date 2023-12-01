"use strict";

let logoutButton = new LogoutButton;
logoutButton.action = () => {
    ApiConnector.logout((func) => {
        if (func.success === true){
            location.reload();
        }
    }
    )
}

ApiConnector.current((func) => {
    if (func.success === true){
        ProfileWidget.showProfile(func.data);
    }
}
)

let ratesBoard = new RatesBoard;
function getStocks(){
    ApiConnector.getStocks((func) => {
        if (func.success === true){
            ratesBoard.clearTable();
            ratesBoard.fillTable(func.data);  
        }
    })
}
getStocks()
setInterval(getStocks, 60000)

let moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data) => { //как тут получились данные?
    ApiConnector.addMoney(data, (func) =>{
        if (func.success === true){
            ProfileWidget.showProfile(func.data);
            moneyManager.setMessage(true, 'Успешно');
        } else {
            moneyManager.setMessage(false, func.error)
        }     
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (func) => {
        if (func.success === true){
            ProfileWidget.showProfile(func.data);
            moneyManager.setMessage(true, 'Успешно');
        } else {
            moneyManager.setMessage(false, func.error)
        }     
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (func) => {
        if (func.success === true){
            ProfileWidget.showProfile(func.data);
            moneyManager.setMessage(true, 'Успешно');
        } else {
            moneyManager.setMessage(false, func.error)
        }     
    })
}

let favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites((func) => {
    console.log(func)
    if (func.success === true){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(func.data);
        moneyManager.updateUsersList(func.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (func) => {
        if (func.success === true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(func.data);
            moneyManager.updateUsersList(func.data);
            favoritesWidget.setMessage(true, 'Успешно');
        } else {
            favoritesWidget.setMessage(false, func.error)
        }   
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (func) => {
        if (func.success === true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(func.data);
            moneyManager.updateUsersList(func.data);
            favoritesWidget.setMessage(true, 'Успешно');
        } else {
            favoritesWidget.setMessage(false, func.error)
        }   
    })
}



