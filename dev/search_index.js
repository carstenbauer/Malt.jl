var documenterSearchIndex = {"docs":
[{"location":"#Malt.jl","page":"Malt.jl","title":"Malt.jl","text":"","category":"section"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Malt is a multiprocessing package for Julia. You can use Malt to create Julia processes, and to perform computations in those processes. Unlike the standard library package Distributed.jl, Malt is focused on process sandboxing, not distributed computing.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Malt","category":"page"},{"location":"#Malt","page":"Malt.jl","title":"Malt","text":"The Malt module doesn't export anything, use qualified names instead. Internal functions are marked with a leading underscore, these functions are not stable.\n\n\n\n\n\n","category":"module"},{"location":"#Malt-workers","page":"Malt.jl","title":"Malt workers","text":"","category":"section"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"We call the Julia process that creates processes the manager, and the created processes are called workers. These workers communicate with the manager using the TCP protocol.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Workers are isolated from one another by default. There's no way for two workers to communicate with one another, unless you set up a communication mechanism between them explicitly.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Workers have separate memory, separate namespaces, and they can have separate project environments; meaning they can load separate packages, or different versions of the same package.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Since workers are separate Julia processes, the number of workers you can create, and whether worker execution is multi-threaded will depend on your operating system.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Malt.Worker","category":"page"},{"location":"#Malt.Worker","page":"Malt.jl","title":"Malt.Worker","text":"Malt.Worker()\n\nCreate a new Worker. A Worker struct is a handle to a (separate) Julia process.\n\nExamples\n\njulia> w = Malt.worker()\nMalt.Worker(0x0000, Process(`…`, ProcessRunning))\n\n\n\n\n\n","category":"type"},{"location":"#Calling-Functions","page":"Malt.jl","title":"Calling Functions","text":"","category":"section"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"The easiest way to execute code in a worker is with the remote_call* functions.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Depending on the computation you want to perform, you might want to get the result synchronously or asynchronously; you might want to store the result or throw it away. The following table lists each function according to its scheduling and return value:","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Function Scheduling Return value\nMalt.remote_call_fetch Blocking <value>\nMalt.remote_call_wait Blocking nothing\nMalt.remote_call Async Task that resolves to <value>\nMalt.remote_do Async nothing","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Malt.remote_call_fetch\nMalt.remote_call_wait\nMalt.remote_call\nMalt.remote_do","category":"page"},{"location":"#Malt.remote_call_fetch","page":"Malt.jl","title":"Malt.remote_call_fetch","text":"Malt.remote_call_fetch(f, w::Worker, args...; kwargs...)\n\nShorthand for fetch(Malt.remote_call(…)). Blocks and then returns the result of the remote call.\n\n\n\n\n\n","category":"function"},{"location":"#Malt.remote_call_wait","page":"Malt.jl","title":"Malt.remote_call_wait","text":"Malt.remote_call_wait(f, w::Worker, args...; kwargs...)\n\nShorthand for wait(Malt.remote_call(…)). Blocks and discards the resulting value.\n\n\n\n\n\n","category":"function"},{"location":"#Malt.remote_call","page":"Malt.jl","title":"Malt.remote_call","text":"Malt.remote_call(f, w::Worker, args...; kwargs...)\n\nEvaluate f(args...; kwargs...) in worker w asynchronously. Returns a task that acts as a promise; the result value of the task is the result of the computation.\n\nThe function f must already be defined in the namespace of w.\n\nExamples\n\njulia> promise = Malt.remote_call(uppercase ∘ *, w, \"I \", \"declare \", \"bankruptcy!\");\n\njulia> fetch(promise)\n\"I DECLARE BANKRUPTCY!\"\n\n\n\n\n\n","category":"function"},{"location":"#Malt.remote_do","page":"Malt.jl","title":"Malt.remote_do","text":"Malt.remote_do(f, w::Worker, args...; kwargs...)\n\nStart evaluating f(args...; kwargs...) in worker w asynchronously, and return nothing.\n\nUnlike remote_call, no reference to the remote call is available. This means:\n\nYou cannot wait for the call to complete on the worker.\nThe value returned by f is not available.\n\n\n\n\n\n","category":"function"},{"location":"#Evaluating-expressions","page":"Malt.jl","title":"Evaluating expressions","text":"","category":"section"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"In some cases, evaluating functions is not enough. For example, importing modules alters the global state of the worker and can only be performed in the top level scope. For situations like this, you can evaluate code using the remote_eval* functions.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Like the remote_call* functions, there's different a remote_eval* depending on the scheduling and return value.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Function Scheduling Return value\nMalt.remote_eval_fetch Blocking <value>\nMalt.remote_eval_wait Blocking nothing\nMalt.remote_eval Async Task that resolves to <value>","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Malt.remote_eval_fetch\nMalt.remote_eval_wait\nMalt.remote_eval\nMalt.worker_channel","category":"page"},{"location":"#Malt.remote_eval_fetch","page":"Malt.jl","title":"Malt.remote_eval_fetch","text":"Shorthand for fetch(Malt.remote_eval(…)). Blocks and returns the resulting value.\n\n\n\n\n\n","category":"function"},{"location":"#Malt.remote_eval_wait","page":"Malt.jl","title":"Malt.remote_eval_wait","text":"Shorthand for wait(Malt.remote_eval(…)). Blocks and discards the resulting value.\n\n\n\n\n\n","category":"function"},{"location":"#Malt.remote_eval","page":"Malt.jl","title":"Malt.remote_eval","text":"Malt.remote_eval(mod::Module=Main, w::Worker, expr)\n\nEvaluate expression expr under module mod on the worker w. Malt.remote_eval is asynchronous, like Malt.remote_call.\n\nThe module m and the type of the result of expr must be defined in both the main process and the worker.\n\nExamples\n\njulia> Malt.remote_eval(w, quote\n    x = \"x is a global variable\"\nend)\n\njulia> Malt.remote_eval_fetch(w, :x)\n\"x is a global variable\"\n\n\n\n\n\n","category":"function"},{"location":"#Malt.worker_channel","page":"Malt.jl","title":"Malt.worker_channel","text":"Malt.worker_channel(w::AbstractWorker, expr)\n\nCreate a channel to communicate with worker w. expr must be an expression that evaluates to a Channel. expr should assign the Channel to a (global) variable so the worker has a handle that can be used to send messages back to the manager.\n\n\n\n\n\n","category":"function"},{"location":"#Exceptions","page":"Malt.jl","title":"Exceptions","text":"","category":"section"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"If an exception occurs on the worker while calling a function or evaluating an expression, this exception is rethrown to the host. For example:","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"julia> Malt.remote_call_fetch(m1, :(sqrt(-1)))\nERROR: Remote exception from Malt.Worker on port 9115:\n\nDomainError with -1.0:\nsqrt will only return a complex result if called with a complex argument. Try sqrt(Complex(x)).\nStacktrace:\n [1] throw_complex_domainerror(f::Symbol, x::Float64)\n   @ Base.Math ./math.jl:33\n [2] sqrt\n   @ ./math.jl:591 [inlined]\n ...","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"The thrown exception is of the type Malt.RemoteException, and contains two fields: worker and message::String. The original exception object (DomainError in the example above) is not availabale to the host.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"note: Note\nWhen using the async scheduling functions (remote_call, remote_eval), calling wait or fetch on the returned (failed) Task will throw a Base.TaskFailedException, not a Malt.RemoteException.(The Malt.RemoteException is available with task_failed_exception.task.exception.)","category":"page"},{"location":"#Signals-and-Termination","page":"Malt.jl","title":"Signals and Termination","text":"","category":"section"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Once you're done computing with a worker, or if you find yourself in an unrecoverable situation (like a worker executing a divergent function), you'll want to terminate the worker.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"The ideal way to terminate a worker is to use the stop function, this will send a message to the worker requesting a graceful shutdown.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Note that the worker process runs in the same process group as the manager, so if you send a signal to a manager, the worker will also get a signal.","category":"page"},{"location":"","page":"Malt.jl","title":"Malt.jl","text":"Malt.isrunning\nMalt.stop\nBase.kill(::Malt.Worker)\nMalt.interrupt\nMalt.TerminatedWorkerException","category":"page"},{"location":"#Malt.isrunning","page":"Malt.jl","title":"Malt.isrunning","text":"Malt.isrunning(w::Worker)::Bool\n\nCheck whether the worker process w is running.\n\n\n\n\n\n","category":"function"},{"location":"#Malt.stop","page":"Malt.jl","title":"Malt.stop","text":"Malt.stop(w::Worker; exit_timeout::Real=15.0, term_timeout::Real=15.0)::Bool\n\nTerminate the worker process w in the nicest possible way. We first try using Base.exit, then SIGTERM, then SIGKILL. Waits for the worker process to be terminated.\n\nIf w is still alive, and now terinated, stop returns true. If w is already dead, stop returns false. If w failed to terminate, throw an exception.\n\n\n\n\n\n","category":"function"},{"location":"#Base.kill-Tuple{Malt.Worker}","page":"Malt.jl","title":"Base.kill","text":"kill(w::Malt.Worker, signum=Base.SIGTERM)\n\nTerminate the worker process w forcefully by sending a SIGTERM signal (unless otherwise specified).\n\nThis is not the recommended way to terminate the process. See Malt.stop.\n\n\n\n\n\n","category":"method"},{"location":"#Malt.interrupt","page":"Malt.jl","title":"Malt.interrupt","text":"Malt.interrupt(w::Worker)\n\nSend an interrupt signal to the worker process. This will interrupt the latest request (remote_call* or remote_eval*) that was sent to the worker.\n\n\n\n\n\n","category":"function"},{"location":"#Malt.TerminatedWorkerException","page":"Malt.jl","title":"Malt.TerminatedWorkerException","text":"Malt will raise a TerminatedWorkerException when a remote_call is made to a Worker that has already been terminated.\n\n\n\n\n\n","category":"type"}]
}
