import { Stiptap, StarterKit } from '@/tiptap/tiptap.jsx'
import Sidebar from '@/components/Sidebar.jsx'
const App = () => {
  // const onBeforeCreate = (event) => {
  //   console.log('onBeforeCreate', event)
  // }
  // const onCreate = (event) => {
  //   console.log('onCreate', event)
  // }
  // const onUpdate = (event) => {
  //   console.log('onUpdate', event)
  // }
  // const onSelectionUpdate = (event) => {
  //   console.log('onSelectionUpdate', event)
  // }
  // const onTransaction = (event) => {
  //   console.log('onTransaction', event)
  // }
  // const onFocus = (event) => {
  //   console.log('onFocus', event)
  // }
  // const onBlur = (event) => {
  //   console.log('onBlur', event)
  // }
  // const onDestroy = (event) => {
  //   console.log('onDestroy', event)
  // }
  return (
    <div className="App">
      <Sidebar mainContent={
        <Stiptap
          className='m-auto h-screen max-w-xl'
          // onBeforeCreate={onBeforeCreate}
          // onCreate={onCreate}
          // onUpdate={onUpdate}
          // onSelectionUpdate={onSelectionUpdate}
          // onTransaction={onTransaction}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onDestroy={onDestroy}
          extensions={[StarterKit]}
        // slashMenu={[{ label: 'test', key: 'h1' }]}
        />
      }></Sidebar>
      {/* <Stiptap
        className='m-2 h-screen'
        // onBeforeCreate={onBeforeCreate}
        // onCreate={onCreate}
        // onUpdate={onUpdate}
        // onSelectionUpdate={onSelectionUpdate}
        // onTransaction={onTransaction}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onDestroy={onDestroy}
        extensions={[StarterKit]}
      // slashMenu={[{ label: 'test', key: 'h1' }]}
      /> */}
    </div>
  )
}

export default App
