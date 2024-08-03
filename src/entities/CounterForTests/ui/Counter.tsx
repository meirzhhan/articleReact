import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

// Для теса новых фичей, нет логики

export const Counter = () => {
  const counterValue = useCounterValue();

  const { decrement, increment, add } = useCounterActions();

  const handleInc = () => {
    increment();
  };
  const handleDec = () => {
    decrement();
  };

  const handleAdd = () => {
    add(counterValue);
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={handleInc} data-testid="increment-btn">
        increment
      </Button>
      <Button onClick={handleDec} data-testid="decrement-btn">
        decrement
      </Button>
      <Button onClick={handleAdd} data-testid="decrement-btn">
        add
      </Button>
    </div>
  );
};
