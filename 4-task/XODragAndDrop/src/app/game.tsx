export type Position = any;
export type currentPosition = number[];
export type PositionObserver = ((position: Position) => void) | null;

export class Game {
  public XPositions: Position = [];
  public YPositions: Position = [];
  public currentXPosition: currentPosition = [];
  public currentYPosition: currentPosition = [];
  private observers: PositionObserver[] = [];

  public observe(o: PositionObserver): () => void {
    this.observers.push(o);
    // this.emitChange();

    return (): void => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  public Move(toX: number, toY: number, itemName: string): void {
    if (itemName === "X") {
      this.XPositions.push(`${toX}, ${toY}`);
      this.currentXPosition = [toX, toY];
      this.currentYPosition = [];
    } else if (itemName === "O") {
      this.YPositions.push(`${toX}, ${toY}`);
      this.currentXPosition = [];
      this.currentYPosition = [toX, toY];
    }
    console.log(this.XPositions);
    console.log(this.YPositions);
  }

  public Flip() {}

  public canDrop(toX: number, toY: number): boolean {
    return (
      !this.XPositions.includes(`${toX}, ${toY}`) &&
      !this.YPositions.includes(`${toX}, ${toY}`)
    );
  }
}
