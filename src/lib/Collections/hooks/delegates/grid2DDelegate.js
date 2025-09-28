/**
 * 2D Grid Navigation Delegate
 * Handles true 2D navigation with row/column awareness
 */
export const create2DDelegate = (itemKeys, totalItems, loop, getCurrentPosition, actualColumnsCount, rowsCount) => {
  const getNextIndex = (direction, currentKey) => {
    const current = getCurrentPosition(currentKey);
    let newIndex = current.index;
    let newRow = current.row;
    let newCol = current.col;

    switch (direction) {
      case "next":
      case "right":
        newCol = current.col + 1;
        if (newCol >= actualColumnsCount) {
          if (loop) {
            newCol = 0;
            newRow = current.row;
          } else {
            return null;
          }
        }
        newIndex = newRow * actualColumnsCount + newCol;
        break;

      case "previous":
      case "left":
        newCol = current.col - 1;
        if (newCol < 0) {
          if (loop) {
            newCol = actualColumnsCount - 1;
            newRow = current.row;
          } else {
            return null;
          }
        }
        newIndex = newRow * actualColumnsCount + newCol;
        break;

      case "down":
        newRow = current.row + 1;
        if (newRow >= rowsCount) {
          newRow = loop ? 0 : current.row;
        }
        newIndex = newRow * actualColumnsCount + current.col;

        // Handle case where new index exceeds total items
        if (newIndex >= totalItems) {
          if (loop) {
            newIndex = current.col; // Go to first row, same column
          } else {
            return null;
          }
        }
        break;

      case "up":
        newRow = current.row - 1;
        if (newRow < 0) {
          if (loop) {
            // Go to last row, but check if that position exists
            const lastRowIndex = (rowsCount - 1) * actualColumnsCount + current.col;
            newRow = lastRowIndex < totalItems ? rowsCount - 1 : rowsCount - 2;
          } else {
            return null;
          }
        }
        newIndex = newRow * actualColumnsCount + current.col;

        // Ensure index is valid
        if (newIndex >= totalItems) {
          newIndex = totalItems - 1;
        }
        break;

      case "home":
        newIndex = 0;
        break;

      case "end":
        newIndex = totalItems - 1;
        break;

      default:
        return null;
    }

    return newIndex >= 0 && newIndex < totalItems ? itemKeys[newIndex] : null;
  };

  return { getNextIndex };
};