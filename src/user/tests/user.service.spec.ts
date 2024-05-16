import { somar } from "../../core/utils/somar.function";

test('This is my first test', () => {
    const result = somar(5, 2);
    expect(result).toBe(7);
    });