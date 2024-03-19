import { usePanel } from '../../../src/react/hooks/usePanel';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

const text1 = `This is sentence 1. This is sentence 2.


This is paragraph 2. This is the first sentence. This is the second sentence.
`;

describe('usePanel tests for text1', () => {
    const { generateWordSequenceIndicesFromIndex } = renderHook(() => usePanel()).result.current;

    test('generating word sequences with one word', () => {
        const indices = generateWordSequenceIndicesFromIndex("word", 0, 1);
        expect(indices).toEqual([0]);
    });

    test('generating word sequences with one word and large word sequence size', () => {
        const indices = generateWordSequenceIndicesFromIndex("word", 0, 5);
        expect(indices).toEqual([0]);
    });

    test('generating word sequences at index 0', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 0, 1);
        expect(indices).toEqual([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]);
    });

    test('generating word sequences at index 5 (second word)', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 5, 1);
        expect(indices).toEqual([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]);
    });

    test('generating word sequences at index 60 (twelth word)', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 60, 1);
        expect(indices).toEqual([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]);
    });

    test('generating word sequences at index 103 (second to last word)', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 103, 1);
        expect(indices).toEqual([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]);
    });

    test('generating word sequences at index 110 (last word)', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 103, 1);
        expect(indices).toEqual([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]);
    });

    test('generating word sequences at last character index', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 119, 1);
        expect(indices).toEqual([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]);
    });

    test('generating word sequences with 5 words per sequence', () => {

        const indices = generateWordSequenceIndicesFromIndex(text1, 0, 5);
        expect(indices).toEqual([0, 25, 50, 75, 103]);
    });

    test('generating new word sequences after we adjust word boundary to another paragraph', () => {
        const oldIndices = generateWordSequenceIndicesFromIndex(text1, 0, 5);
        const indices = generateWordSequenceIndicesFromIndex(text1, 42, 5);

        expect(oldIndices).toEqual([0, 25, 50, 75, 103]);
        expect(indices).toEqual([0, 17, 42, 68, 96]);
        expect(indices).not.toEqual(oldIndices);
    });
});

describe('getSmallestLesserValue', () => {
    const { getSmallestLargerValue } = renderHook(() => usePanel()).result.current;

    test('testing that smallest larger value is found for number in list', () => {
        expect(getSmallestLargerValue([0,2,90,4,1,12,123], 2)).toBe(4);
    });

    test('testing that smallest larger value is found for number not in list', () => {
        expect(getSmallestLargerValue([0,2,90,4,1,12,123], 5)).toBe(12);
    });
});

describe('getLargestLesserValue', () => {
    const { getLargestLesserValue } = renderHook(() => usePanel()).result.current;

    test('testing that largest smaller value is found for number in list', () => {
        expect(getLargestLesserValue([0,2,90,4,1,12,123], 12)).toBe(4);
    });

    test('testing that largest smaller value is found for number not in list', () => {
        expect(getLargestLesserValue([0,2,90,4,1,12,123], 6)).toBe(4);
    });
});
