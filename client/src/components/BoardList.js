import styled from 'styled-components';
import Board from './Board';

const BoardListWrap = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
`;

export default function BoardList({ isLogedIn, boardListData }) {
  console.log(boardListData)
  return (
    <BoardListWrap>
      {boardListData.map(board => {
        return <Board key={board._id} isLogedIn={isLogedIn} board={board} />
      })}
    </BoardListWrap>
  );
}
