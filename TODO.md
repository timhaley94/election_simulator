TODO
- Set up coverage badges
- Improve the look of the graph
- Improve the look of the controls
- Add control for # of political parties
- Add control for # of iterations
- Add information about which tick the simulation is on
- Write up title and body content
- Actually implement a rational strategy that does the right thing

Describe the rules of "rational" decisions:
- If only two parties can reasonably win, choose the preferred party of the two
- If only one party can reasonably win, choose

Algorithm:
1. Find all parties with a "reasonable" chance of winning
2. If there's only one, vote for your favorite party of all
3. Else, if there's only two, vote for your favorite party of the two
4. Else, reset payoff of the remaining parties to be their payoff minus the
    lowest competitive party's payoff. Calculate weighted payoff for the set
    and choose the party with the highest weighted payoff.
