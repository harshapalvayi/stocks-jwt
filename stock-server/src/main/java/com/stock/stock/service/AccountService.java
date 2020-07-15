package com.stock.stock.service;

import com.stock.stock.model.BrokerageAccounts;
import com.stock.stock.model.BrokerageEnums;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountService {

    public List<BrokerageAccounts> getBrokerageAccounts() {

        List<BrokerageAccounts> accounts = new ArrayList<>();
        BrokerageAccounts yahoo = new BrokerageAccounts(1, BrokerageEnums.YAHOOFINANCE, "https://finance.yahoo.com/quote/");
        BrokerageAccounts robinhood = new BrokerageAccounts(2, BrokerageEnums.ROBINHOOD, "https://robinhood.com/stocks/");
        BrokerageAccounts webull = new BrokerageAccounts(3, BrokerageEnums.WEBULL, "https://www.webull.com/quote/");
        BrokerageAccounts fidelity = new BrokerageAccounts(5, BrokerageEnums.FIDElITY, "https://www.fidelity.com/");
        BrokerageAccounts etrade = new BrokerageAccounts(6, BrokerageEnums.ETRADE, "https://us.etrade.com/");

        accounts.add(yahoo);
        accounts.add(robinhood);
        accounts.add(webull);
        accounts.add(fidelity);
        accounts.add(etrade);

        return accounts;
    }
}
