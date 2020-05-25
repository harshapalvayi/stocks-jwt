package com.stock.stock.service;

import com.stock.stock.model.BrokerageAccounts;
import com.stock.stock.model.BrokerageEnums;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {

    public List<BrokerageAccounts> getBrokerageAccounts() {

        List<BrokerageAccounts> accounts = new ArrayList<BrokerageAccounts>();
        BrokerageAccounts yahoo = new BrokerageAccounts(1, BrokerageEnums.YAHOOFINANCE, "https://finance.yahoo.com/");
        BrokerageAccounts robinhood = new BrokerageAccounts(2, BrokerageEnums.ROBINHOOD, "https://robinhood.com/");
        BrokerageAccounts ameritrade = new BrokerageAccounts(3, BrokerageEnums.AMERITRADE, "https://www.tdameritrade.com/");
        BrokerageAccounts fidelity = new BrokerageAccounts(4, BrokerageEnums.FIDElITY, "https://www.fidelity.com/");
        BrokerageAccounts etrade = new BrokerageAccounts(5, BrokerageEnums.ETRADE, "https://us.etrade.com/");
        BrokerageAccounts cash = new BrokerageAccounts(6, BrokerageEnums.CASH, "https://cash.app/");

        accounts.add(yahoo);
        accounts.add(robinhood);
        accounts.add(ameritrade);
        accounts.add(fidelity);
        accounts.add(etrade);
        accounts.add(cash);
        return accounts;
    }
}
