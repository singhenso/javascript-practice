/*
https://developers.google.com/web/fundamentals/getting-started/primers/promises

Fulfilled (resolved): It worked
Rejected: it didn't work
Pending: Still waiting
Settled: Something happened!

Promise can only resolve once. A second "resolve" call will go unnoticed. Promises execute
in the main thread, so they are still potentially blocking.  Frame rate of your app can
suffer. Think of promises as "try catch" wrappers around asynch code.

Use promises when you're running asynchronous code.
*/