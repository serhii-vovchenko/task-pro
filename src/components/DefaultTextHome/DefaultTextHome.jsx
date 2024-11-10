import s from './DefaultTextHome.module.css';

const DefaultTextHome = () => {
  return (
    <div className={s.wrapper}>
      <p className={s.text}>
        Before starting your project, it is essential{' '}
        <span className={s.span}>to create a board</span> to visualize and track
        all the necessary tasks and milestones. This board serves as a powerful
        tool to organize the workflow and ensure effective collaboration among
        team members.
      </p>
    </div>
  );
};

export default DefaultTextHome;
