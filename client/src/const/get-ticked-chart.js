export const tickedChart = (allTicked, nameMovie) => {
  let listTickedByMovieName;
  if (allTicked) {
    listTickedByMovieName = nameMovie.map((name) => {
      const b = allTicked.ticked.filter(
        (item) => item.movieName == name
      );
      return b;
    });
  }
  let listSeatByMovie;
  if (listTickedByMovieName) {
    listSeatByMovie = listTickedByMovieName.map((item) => {
      let listSeat;
      if (item.length > 0) {
        listSeat = item.map((k) => k.listSeat);
      } else {
        listSeat = 0;
      }
      return listSeat;
    });
  }
  if (listSeatByMovie) {
    listSeatByMovie = listSeatByMovie.map((item) => {
      let newItem;
      if (item.length > 0) {
        newItem = item.join(' ');
      } else {
        newItem = item;
      }
      return newItem;
    });
  }
  let totalTickedByMovie;
  if (listSeatByMovie) {
    totalTickedByMovie = listSeatByMovie.map((item) => {
      let total;
      if (item.length > 0) {
        total = item.split(' ').length;
      } else {
        total = 0;
      }
      return total;
    });
  }
  return totalTickedByMovie;
};
