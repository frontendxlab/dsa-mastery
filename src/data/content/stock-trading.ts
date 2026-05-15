import type { Article } from '../articles'

export const stockTradingArticle: Article = {
  slug: 'stock-trading',
  title: 'Stock Trading DP',
  emoji: '📈',
  tagline: 'Buy/sell with cooldown, fees, k transactions. State machine DP on market states.',
  description: 'Stock trading problems use state machine DP: states track whether you currently hold stock, how many transactions remain, and cooldown periods. Key insight: define states (holding, not holding, cooldown) and transitions between them. Base cases: first day. For k transactions: dp[day][transactions_left][holding]. Optimization: when k >= n/2, unlimited transactions.',
  gradient: 'from-emerald-700 to-green-800',
  topicSlug: 'dp',
  readTime: '14 min',
  sections: [
    {
      type: 'text',
      content: `Stock DP states: hold = max profit when holding a stock today; free = max profit when not holding and no cooldown; cool = max profit in cooldown (just sold). Transitions: hold = max(hold, free - price); cool = hold + price; free = max(free, cool). General k-transaction: dp[k][0/1] where 0=not holding, 1=holding. When k >= n/2, treat as unlimited.`,
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'State machine DP for stock with cooldown',
      code: `// Best Time to Buy and Sell Stock with Cooldown
// States: hold (have stock), free (no stock, no cooldown), cool (just sold, cooldown)
function maxProfitWithCooldown(prices) {
    let hold = -Infinity, free = 0, cool = 0;
    for (const price of prices) {
        const prevHold = hold, prevFree = free, prevCool = cool;
        hold = Math.max(prevHold, prevFree - price); // buy from free state
        cool = prevHold + price;                      // sell (enter cooldown)
        free = Math.max(prevFree, prevCool);          // wait in free or exit cooldown
    }
    return Math.max(free, cool);
}

// k transactions: dp[k][0] = max profit, k trans used, not holding
//                 dp[k][1] = max profit, k trans used, holding
function maxProfitKTransactions(k, prices) {
    const n = prices.length;
    if (k >= Math.floor(n / 2)) {
        // Unlimited transactions
        let profit = 0;
        for (let i = 1; i < n; i++) profit += Math.max(0, prices[i] - prices[i-1]);
        return profit;
    }
    const dp = Array.from({length: k+1}, () => [-Infinity, -Infinity]);
    dp[0][0] = 0;
    for (const price of prices) {
        for (let t = k; t >= 1; t--) {
            dp[t][0] = Math.max(dp[t][0], dp[t][1] + price);   // sell
            dp[t][1] = Math.max(dp[t][1], dp[t-1][0] - price); // buy
        }
    }
    return Math.max(0, ...dp.map(d => d[0]));
}`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Best Time to Buy and Sell Stock II',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — capture every upward move',
          explanation: `With unlimited transactions, profit = sum of all positive day-over-day increases. Equivalent to buying at every valley and selling at every peak.`,
          code: `var maxProfit = function(prices) {
    let profit=0;
    for(let i=1;i<prices.length;i++) profit+=Math.max(0,prices[i]-prices[i-1]);
    return profit;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: State machine DP — hold, sold (cooldown), rest states',
          explanation: `Three states: hold, sold (just sold → cooldown), rest (can buy). Transitions: hold = max(hold, rest - price); sold = hold + price; rest = max(rest, sold). Answer = max(sold, rest).`,
          code: `var maxProfit = function(prices) {
    let hold=-Infinity, sold=0, rest=0;
    for(const p of prices){
        const ph=hold,ps=sold,pr=rest;
        hold=Math.max(ph,pr-p);
        sold=ph+p;
        rest=Math.max(pr,ps);
    }
    return Math.max(sold,rest);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Best Time to Buy and Sell Stock with Transaction Fee',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: DP with two states: hold and free',
          explanation: `hold = best profit while holding stock. free = best profit without stock. Transitions: free = max(free, hold + price - fee); hold = max(hold, free - price). Fee paid on sell.`,
          code: `var maxProfit = function(prices, fee) {
    let hold=-prices[0], free=0;
    for(let i=1;i<prices.length;i++){
        free=Math.max(free,hold+prices[i]-fee);
        hold=Math.max(hold,free-prices[i]);
    }
    return free;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Best Time to Buy and Sell Stock IV',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: DP[k][0/1] — k transactions, holding or not',
          explanation: `dp[t][0] = max profit with at most t transactions, not holding. dp[t][1] = max profit with t transactions in use, holding. For k >= n/2, use greedy (unlimited). Otherwise: dp[t][0] = max(dp[t][0], dp[t][1]+price); dp[t][1] = max(dp[t][1], dp[t-1][0]-price).`,
          code: `var maxProfit = function(k, prices) {
    const n=prices.length;
    if(k>=n/2){
        let p=0;for(let i=1;i<n;i++) p+=Math.max(0,prices[i]-prices[i-1]);return p;
    }
    const dp=Array.from({length:k+1},()=>[-Infinity,-Infinity]);
    dp[0][0]=0;
    for(const p of prices){
        for(let t=k;t>=1;t--){
            dp[t][0]=Math.max(dp[t][0],dp[t][1]+p);
            dp[t][1]=Math.max(dp[t][1],dp[t-1][0]-p);
        }
    }
    return Math.max(0,...dp.map(d=>d[0]));
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '📈',
      color: 'green',
      content: `**Stock problem pattern map:**\n- 1 transaction: track min price seen, max(0, price - min)\n- Unlimited: greedy, sum all positive differences\n- Cooldown: 3-state DP (hold, sold/cooldown, rest)\n- Fee: 2-state DP (hold, free), subtract fee on sell\n- k transactions: dp[k][holding], iterate k from k down to 1\n\n**Key insight:** A "transaction" = one buy + one sell. When k ≥ n/2, any two consecutive days can form a transaction, so effectively unlimited.\n\n**State machine approach works for all variants:** Just adjust the state transitions for the specific constraint (cooldown, fee, k limit).`,
    },
  ],
}
