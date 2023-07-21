import PostsTable from './components/posts-table/posts-table.tsx';
import css from './app.module.scss';


const App = () => {
    return (
        <div className={css.container}>
            <div className={css.content}>
                <PostsTable/>
            </div>
        </div>
    );
};

export default App;