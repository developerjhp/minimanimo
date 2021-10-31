import styled from 'styled-components';
import Board from './Board';
import { Link } from 'react-router-dom';

const BoardListWrap = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;

  .list_none {
    line-height: 80vh;
    display: block;
  }
`;

export default function BoardList({ isLogedIn, boardListData }) {
  return (
    <BoardListWrap>
      {boardListData.length
      ? boardListData.map(board => {
        return <Board key={board._id} isLogedIn={isLogedIn} board={board} />
      })
      : <Link to='/' className="list_none">
          <div>작성하신 게시글이 존재하지 않습니다.</div>
        </Link>}
    </BoardListWrap>
  );
}
