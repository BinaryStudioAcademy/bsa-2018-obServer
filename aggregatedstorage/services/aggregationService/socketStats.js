module.exports = (slicedLogs) => {
  const aggregatedSocketLogs = [];

  slicedLogs.forEach((logsChunk) => {
    if (logChunk[0].isEmpty) {
      aggregatedSocketLogs.push({
        roomsAmount: 0,
        rooms: [],
        timestamp: logChunk[0].timestamp
      });
      return;
    }

    let roomsAmount = 0;
    let rooms = {};

    logsChunk.forEach((logItem) => {
      roomsAmount += logItem.roomsAmount;
      logItem.rooms.forEach((room) => {
        if (rooms[room.name]) {
          rooms[room.name] += room.amount; 
        } else {
          rooms[room.name] = room.amount;
        }
      });
      usedHeap += logItem.heap.used;
    });

    const aggregatedRooms = [];

    for (name in rooms) {
      aggregatedRooms.push({
        name: name,
        amount: Math.round(rooms[name] / logsChunk.length)
      });
    }
    
    aggregatedSocketLogs.push({
      roomsAmount: Math.round(roomsAmount / logsChunk.length),
      rooms: aggregatedRooms,
      timestamp: logsChunk[0].timestamp
    });
  });
  return aggregatedSocketLogs;
}