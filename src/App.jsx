import { Stiptap, StarterKit } from '@/tiptap/tiptap.jsx'
import Sidebar from '@/components/Sidebar.jsx'
const App = () => {
  const content = `<div document-title>Sparrow Tiptap</div>
  <h2>
  Hi there,
</h2 >
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>`
  // const onBeforeCreate = (event) => {
  //   console.log('onBeforeCreate', event)
  // }
  // const onCreate = (event) => {
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
  const getOutput = (data) => {
    console.log('output')
  }

  return (
    <div className="App">
      <Sidebar mainContent={
        <Stiptap
          className='m-auto h-96 w-3/4 overflow-auto'
          outputFormat="html"
          content={content}
          getOutput={getOutput}
          // onBeforeCreate={onBeforeCreate}
          // onCreate={onCreate}
          editable={true}
          // onUpdate={onUpdate}
          // onSelectionUpdate={onSelectionUpdate}
          // onTransaction={onTransaction}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onDestroy={onDestroy}
          extensions={[StarterKit.configure({ document: { documentTitle: true } })]}
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
