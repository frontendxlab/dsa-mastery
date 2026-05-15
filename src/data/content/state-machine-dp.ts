import type { Article } from '../articles'

export const stateMachineDpArticle: Article = {
  slug: 'state-machine-dp',
  title: 'State Machine DP',
  emoji: '🔄',
  tagline: 'Model transitions between states. Stock problems are the canonical example.',
  description: 'State machine DP models problems where you\'re in one of several states and transition between them. The buy/sell stock series is the classic example: states are (holding, not holding), and you add constraints (cooldown, fee, k transactions). Once you see the state diagram, the DP transitions write themselves.',
  gradient: 'from-green-600 to-teal-700',
  topicSlug: 'dp',
  readTime: '18 min',
  sections: [
    {
      type: 'text',
      content: `State machine DP is DP where the "state" is not just a position or count, but a discrete status (held/not held, locked/unlocked, active/inactive). At each step, you transition between states based on the current input. The stock problems are the canonical series: each variant adds one more constraint (cooldown, fee, max transactions), and each new constraint adds one more state.`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'The Stock Problem State Machine',
    },
    {
      type: 'code',
      lang: 'javascript',
      caption: 'Base: two states (hold / not hold)',
      code: `// State: hold = currently holding stock, cash = not holding
// Transition:
//   hold[i] = max(hold[i-1],  cash[i-1] - prices[i])  // keep holding OR buy today
//   cash[i] = max(cash[i-1],  hold[i-1] + prices[i])  // keep not holding OR sell today
// Answer: cash[n-1] (never better to hold at end)

// With unlimited transactions (Best Time II):
var maxProfit = function(prices) {
    let hold = -prices[0], cash = 0;
    for (let i = 1; i < prices.length; i++) {
        const prevHold = hold, prevCash = cash;
        hold = Math.max(prevHold, prevCash - prices[i]);  // buy today
        cash = Math.max(prevCash, prevHold + prices[i]);  // sell today
    }
    return cash;
};

// With cooldown (after selling, can't buy next day):
// States: hold, cooldown (day after sell), rest (can buy)
var maxProfitCooldown = function(prices) {
    let hold = -prices[0], cooldown = 0, rest = 0;
    for (let i = 1; i < prices.length; i++) {
        const [h, c, r] = [hold, cooldown, rest];
        hold = Math.max(h, r - prices[i]);    // buy from "rest" state only
        cooldown = h + prices[i];             // sell → next day is cooldown
        rest = Math.max(r, c);               // rest: was already resting or was in cooldown
    }
    return Math.max(cooldown, rest);
};

// With transaction fee:
var maxProfitFee = function(prices, fee) {
    let hold = -prices[0], cash = 0;
    for (let i = 1; i < prices.length; i++) {
        const [h, c] = [hold, cash];
        hold = Math.max(h, c - prices[i]);
        cash = Math.max(c, h + prices[i] - fee);  // pay fee on sell
    }
    return cash;
};`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'State Machine Pattern',
    },
    {
      type: 'callout',
      icon: '💡',
      color: 'teal',
      content: `**How to derive the DP:**\n1. Draw all states (circles)\n2. Draw all transitions (arrows with conditions)\n3. For each state, write: new_state = max/min over all ways to arrive at this state\n4. Initialize: what state are we in on day 0?\n5. Answer: which state has the best final value?\n\nFor stocks: draw "hold" and "cash" circles. Arrows: cash→hold (buy), hold→cash (sell). Add constraints as extra states (cooldown, etc.).`,
    },
    {
      type: 'heading',
      level: 2,
      text: 'Worked Problems',
    },
    {
      type: 'problem',
      num: 1,
      title: 'Best Time to Buy and Sell Stock',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      difficulty: 'Easy',
      intuitions: [
        {
          label: 'Intuition 1: One pass — track min so far, max profit',
          explanation: `At most one transaction. For each day, potential profit = price - minSoFar. Track both minSoFar and maxProfit.`,
          code: `var maxProfit = function(prices) {
    let min = Infinity, profit = 0;
    for (const p of prices) {
        min = Math.min(min, p);
        profit = Math.max(profit, p - min);
    }
    return profit;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 2,
      title: 'Best Time to Buy and Sell Stock II (unlimited)',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Greedy — collect every positive day gap',
          explanation: `Unlimited transactions → collect profit every day the price goes up. Sum all positive differences prices[i+1] - prices[i].`,
          code: `var maxProfit = function(prices) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++)
        profit += Math.max(0, prices[i] - prices[i-1]);
    return profit;
};`,
          lang: 'javascript',
        },
        {
          label: 'Intuition 2: State machine — hold/cash transitions',
          explanation: `hold[i] = max(hold[i-1], cash[i-1] - price[i]). cash[i] = max(cash[i-1], hold[i-1] + price[i]). Both approaches give the same answer.`,
          code: `var maxProfit = function(prices) {
    let hold=-prices[0], cash=0;
    for(let i=1;i<prices.length;i++){
        [hold,cash]=[Math.max(hold,cash-prices[i]), Math.max(cash,hold+prices[i])];
    }
    return cash;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 3,
      title: 'Best Time to Buy and Sell Stock III (at most 2 transactions)',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: 4 states — hold1, cash1, hold2, cash2',
          explanation: `Track four states: after 1st buy (hold1), after 1st sell (cash1), after 2nd buy (hold2), after 2nd sell (cash2). At each day, transition all four states forward.`,
          code: `var maxProfit = function(prices) {
    let hold1=-prices[0], cash1=0, hold2=-prices[0], cash2=0;
    for(let i=1;i<prices.length;i++){
        hold1=Math.max(hold1, -prices[i]);         // 1st buy
        cash1=Math.max(cash1, hold1+prices[i]);    // 1st sell
        hold2=Math.max(hold2, cash1-prices[i]);    // 2nd buy (using profit from 1st)
        cash2=Math.max(cash2, hold2+prices[i]);    // 2nd sell
    }
    return cash2;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 4,
      title: 'Best Time to Buy and Sell Stock IV (at most k transactions)',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
      difficulty: 'Hard',
      intuitions: [
        {
          label: 'Intuition 1: Generalize III — k pairs of states',
          explanation: `dp[j][0] = max profit with at most j transactions, currently not holding. dp[j][1] = max profit with at most j transactions, currently holding. For each price, update all k states. If k >= n/2, unlimited transactions (use greedy).`,
          code: `var maxProfit = function(k, prices) {
    const n = prices.length;
    if (k >= n/2) { // unlimited transactions
        let profit=0;
        for(let i=1;i<n;i++) profit+=Math.max(0,prices[i]-prices[i-1]);
        return profit;
    }
    // dp[j] = [maxProfit not holding after j transactions, maxProfit holding]
    const dp=Array.from({length:k+1},()=>[-Infinity,0]);
    dp[0][1]=0; dp[0][0]=0;
    // Simpler: hold[j] = best profit holding after at most j buys
    //          cash[j] = best profit not holding after at most j complete transactions
    const hold=new Array(k+1).fill(-Infinity);
    const cash=new Array(k+1).fill(0);
    hold[0]=-prices[0];
    for(let i=1;i<n;i++)
        for(let j=k;j>=1;j--){
            cash[j]=Math.max(cash[j],hold[j]+prices[i]); // sell
            hold[j]=Math.max(hold[j],cash[j-1]-prices[i]); // buy using j-1 transactions profit
        }
    return cash[k];
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 5,
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Three states — hold, sold (cooldown), rest',
          explanation: `After selling, you're in "sold" state for one day (cooldown). Then you move to "rest." Only from "rest" can you buy (enter "hold").\nhold → sell → sold → rest → hold → ...`,
          code: `var maxProfit = function(prices) {
    let hold=-prices[0], sold=0, rest=0;
    for(let i=1;i<prices.length;i++){
        const [h,s,r]=[hold,sold,rest];
        hold=Math.max(h, r-prices[i]);  // buy from rest
        sold=h+prices[i];               // sell from hold → next day is cooldown
        rest=Math.max(r, s);            // rest: was resting or finished cooldown
    }
    return Math.max(sold, rest);
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'problem',
      num: 6,
      title: 'Best Time to Buy and Sell Stock with Transaction Fee',
      url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/',
      difficulty: 'Medium',
      intuitions: [
        {
          label: 'Intuition 1: Two states — subtract fee on sell',
          explanation: `Same as unlimited transactions. Two states: hold (bought), cash (free). On sell, pay transaction fee. Collect every profitable day net of fee.`,
          code: `var maxProfit = function(prices, fee) {
    let hold=-prices[0], cash=0;
    for(let i=1;i<prices.length;i++){
        const [h,c]=[hold,cash];
        hold=Math.max(h, c-prices[i]);
        cash=Math.max(c, h+prices[i]-fee);  // subtract fee on sell
    }
    return cash;
};`,
          lang: 'javascript',
        },
      ],
    },
    {
      type: 'callout',
      icon: '🧠',
      color: 'green',
      content: `**State Machine DP blueprint:**\n1. Define all discrete states (hold, sold, rest, locked, etc.)\n2. For each state s_i, write: s_i = max over all (prev_state + action_cost)\n3. Initialize day 0: what can you do on day 0?\n4. Answer: best value across all terminal states\n\n**Stock problems summary:**\n- 1 transaction: track minSoFar and maxProfit\n- Unlimited: collect all positive gaps (greedy) or hold/cash DP\n- Cooldown: 3 states (hold, sold/cooldown, rest)\n- Fee: 2 states, subtract fee on sell\n- k transactions: k pairs of (hold[j], cash[j]) states`,
    },
  ],
}
