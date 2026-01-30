import { renderHook, act } from '@testing-library/react-native';
import { useTransactionHistory } from '../useTransactionHistory';
import { useQuery } from '@apollo/client/react';

jest.mock('@apollo/client/react');

const mockFetchMore = jest.fn();
const mockRefetch = jest.fn();

const mockedUseQuery = useQuery as unknown as jest.Mock;

describe('useTransactionHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
      fetchMore: mockFetchMore,
      refetch: mockRefetch,
      networkStatus: 1,
    });

    const { result } = renderHook(() =>
      useTransactionHistory({ accountId: '1' })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.transactions).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('returns transactions when data is available', () => {
    mockedUseQuery.mockReturnValue({
      data: {
        transactions: {
          total: 2,
          data: [
            { id: '1', amount: 100 },
            { id: '2', amount: 200 },
          ],
        },
      },
      loading: false,
      error: null,
      fetchMore: mockFetchMore,
      refetch: mockRefetch,
      networkStatus: 7,
    });

    const { result } = renderHook(() =>
      useTransactionHistory({ accountId: '1' })
    );

    expect(result.current.transactions.length).toBe(2);
    expect(result.current.total).toBe(2);
  });

  it('calls fetchMore with correct offset when loadMore is called', () => {
    mockedUseQuery.mockReturnValue({
      data: {
        transactions: {
          total: 3,
          data: [
            { id: '1', amount: 100 },
            { id: '2', amount: 200 },
          ],
        },
      },
      loading: false,
      error: null,
      fetchMore: mockFetchMore,
      refetch: mockRefetch,
      networkStatus: 7,
    });

    const { result } = renderHook(() =>
      useTransactionHistory({ accountId: '1' })
    );

    act(() => {
      result.current.loadMore();
    });

    expect(mockFetchMore).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { offset: 2 },
      })
    );
  });

  it('sets isFetchingMore when networkStatus is 3', () => {
    mockedUseQuery.mockReturnValue({
      data: {
        transactions: {
          total: 1,
          data: [{ id: '1', amount: 100 }],
        },
      },
      loading: false,
      error: null,
      fetchMore: mockFetchMore,
      refetch: mockRefetch,
      networkStatus: 3,
    });

    const { result } = renderHook(() =>
      useTransactionHistory({ accountId: '1' })
    );

    expect(result.current.isFetchingMore).toBe(true);
  });
});
