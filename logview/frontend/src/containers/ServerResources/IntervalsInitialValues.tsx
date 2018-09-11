const intervalsInitialValues:
    Array<{
        caller: string
        interval: string
    }> = [
    {
        caller: "cpuLoad",
        interval: 'last 10 minutes'
    },
    {
        caller: "memoryLoad",
        interval: 'last 10 minutes'
    },
    {
        caller: "usedMemoryMb",
        interval: 'last 10 minutes'
    }
]

export default intervalsInitialValues;