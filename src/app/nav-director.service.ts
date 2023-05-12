import { Injectable } from '@angular/core';

// Note: WIP, not used. Exploring an idea for sticky nav buttons.

// Supplemental note: Intentionally not using Signals. Further mentions of signals in comments are just pseudo code, not explicit implementation plans.

// Scenario:
// - Non-linear navigation and linear navigation are possible.
// - "Completed" steps will be skipped.

// Assumptions:
// - Completion determination is biz logic, and requirements is well-defined.
// * This suggests the sticky navigation buttons (next, previous) do not guarantee path will be linear.

/*
 What if...
- Buttons signal to "something" that navigation is occurring
- The content options for the signal could be
* 'next'|'previous'
* The direction/next step expressed as an integer: +1 = next, -1 = previous
   - Note: The component containing the buttons should minimize stateful navigation
     (value sent for each button should be constant)
   - Next button sends +1, Prev button sends -1, Submit sends +1
   - Potential flaw: Previous isn't always linear. Returning to the previous page isn't a previous step. Perhaps this is just categorically different.
   - Maybe: Store the previous step index (for the "out of progress" page return)
*/

/*
Idea:
- Persistant (for page refresh) global storage of step states
- Observable dedicated to network status that guards navigation (busy submitting form, etc.)
  * Is this necessary?
  * Could an HTTPInterceptor centralize this behavior? (minimizing the places toggling the busy status)
- Singleton, globally accessible, non-persistent observable that directs navigation
  * OR just put the sticky bar in a top-level container and use event emitters!
*/

@Injectable()
export class NavDirectorService {
  constructor() {}
}
