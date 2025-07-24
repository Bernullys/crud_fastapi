# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



How works my Crud app:

First the home page shows a select option which displays any table, this is in Body component which have a switch condition where the selected option will return the component of the table.

On selection will show the entire table using TableCard component which accepts the headers or name of each column and the data, both as arrays. The headers will be an array in each table component with its corresponding headers, and the data will be fetch using the function for fetch in api forder. This is made with a useEffect hook because will display all the table with the selection, setting the data with an async function, awaiting the fetch function. 
That is the first read.
At the same time charges a component named Header which is a navegation bar for crud. Header component recives two parameters: selectedTable and onAction. Header onAction will run handleTableAction which is a state that lift the state to its parent and will select any of the crud action and display the corresponding crud component for the current table.
This part was really confusing.

Now depending on the action made in the Header will display the corresponding crud component as already said.

From here on, I have to make the rest of the crud components to be selected on the Header componet. This for every table.