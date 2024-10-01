import Header from '../components/common/Header'
import ScoreTable from '../components/scores/ScoreTable'
const ScorePage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Score Management' />

    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}

          <ScoreTable />
        {/* USER CHARTS */}
    </main>
</div>
  )
}

export default ScorePage
