import images from "../Images/images";

export function foto_puntaje(x: number) {
    if (x === 10) {
      return images.five_stars;
    } else if (9 <= x && x < 10) {
      return images.four_half;
    } else if (8 <= x && x < 9) {
      return images.four_stars;
    } else if (7 <= x && x < 8) {
      return images.three_half;
    } else if (6 <= x && x < 7) {
      return images.three_stars;
    } else if (5 <= x && x < 6) {
      return images.two_half;
    }else if (4 <= x && x < 5) {
      return images.two_stars;
    }else if (3 <= x && x < 4) {
      return images.one_half;
    }else if (2 <= x && x < 3) {
      return images.one_stars;
    }else if (1 <= x && x < 2) {
      return images.zero_half_stars;
    }else {
      return images.zero_stars;
    }
  }