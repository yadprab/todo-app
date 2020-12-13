function todoFn() {
  const loader = document.querySelector("#loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 2000);

  const submit = document.querySelector("form");

  const input = document.querySelector("#todo");

  const ul = document.querySelector(".todo--tasks");

  const clear = document.querySelector(".clear");

  const select = document.querySelector("select");

  const label = document.querySelector("label");

  function getInput(e) {
    e.preventDefault();
    const values = input.value;

    if (values == "") {
      window.alert("enter the task");
    } else {
      const tasks = {
        taskName: `${values}`,
        state: "new",
      };

      if (localStorage.getItem("tasks") === null) {
        const taskArr = [];

        taskArr.push(tasks);

        localStorage.setItem("tasks", JSON.stringify(taskArr));
      } else {
        const taskData = JSON.parse(localStorage.getItem("tasks"));
        taskData.push(tasks);

        localStorage.setItem("tasks", JSON.stringify(taskData));
      }
    }

    //never forget to rest form
    submit.reset();

    fetchData();
  }

  function fetchData() {
    const todoTasks = JSON.parse(localStorage.getItem("tasks"));

    if (todoTasks === null) {
      return;
    } else {
      const html = todoTasks
        .map((task) => {
          return `
           <li class = ' ${task.state}'><span class="task--name" > ${task.taskName} </span> 
            <section class="button--area">
                <button id="completed">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z" fill="hsl(163, 72%, 41%)"/>
                        </svg>
                        
                   </button> <button id="delete">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
    
                   </button>
                   <button class="undo">
                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                       <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z" fill="#4A5568"/>
                       </svg>
                       
                  </button>
            </section>
        </li>
            
            
            
            `;
        })
        .join("");
      ul.innerHTML = html;
    }

    taskState();
  }

  function taskState() {
    if (localStorage.getItem("tasks") === null) {
      return;
    } else {
      const update = JSON.parse(localStorage.getItem("tasks"));

      const completed = document.querySelectorAll("#completed");
      const remove = document.querySelectorAll("#delete");
      const undo = document.querySelectorAll(".undo");
      completed.forEach((task, index) =>
        task.addEventListener("click", (e) => {
          e.preventDefault();

          setTimeout(() => {
            update[index].state = "finished";
            localStorage.setItem("tasks", JSON.stringify(update));
            fetchData();
          }, 1000);
        })
      );
      remove.forEach((task, index) =>
        task.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            update[index].state = "removed";
            localStorage.setItem("tasks", JSON.stringify(update));
            fetchData();
          },
          { once: true }
        )
      );
      undo.forEach((task, index) => {
        task.addEventListener("click", (e) => {
          e.preventDefault();
          update[index].state = "new";
          localStorage.setItem("tasks", JSON.stringify(update));
          fetchData();
        });
      });
    }
  }

  function selectFn() {
    const option = select.value;

    const li = ul.querySelectorAll("li");
    const liArr = [...li];

    switch (option) {
      case "completed":
        liArr.filter((list) =>
          list.classList.contains("finished")
            ? (list.style.display = "flex")
            : (list.style.display = "none")
        );

        break;

      case "uncompleted":
        liArr.filter((list) =>
          list.classList.contains("new")
            ? (list.style.display = "flex")
            : (list.style.display = "none")
        );

        break;

      default:
        liArr.forEach((list) =>
          !list.classList.contains("removed")
            ? (list.style.display = "flex")
            : (list.style.display = "none")
        );
        break;
    }
  }

  function toggleFn(e) {
    e.preventDefault();
    const tog = document.querySelector("#toggle--button");
    const themeObj = {
      theme: "",
      state: "",
    };

    if (document.body.className == "light") {
      document.body.className = "dark";

      tog.className = "move";

      themeObj.theme = document.body.className;

      themeObj.state = tog.className;

      localStorage.setItem("theme", JSON.stringify(themeObj));
    } else {
      document.body.className = "light";

      tog.className = "";

      themeObj.theme = document.body.className;

      themeObj.state = tog.className;

      localStorage.setItem("theme", JSON.stringify(themeObj));
    }
  }

  const setTheme = () => {
    if (localStorage.getItem("theme") == null) {
      return;
    } else {
      const label = document.querySelector("#toggle--button");

      const currentTheme = JSON.parse(localStorage.getItem("theme"));

      const { theme, state } = currentTheme;

      document.body.className = theme;

      label.className = state;
    }
  };

  fetchData();

  setTheme();

  submit.addEventListener("submit", getInput);

  clear.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("tasks");
    ul.innerHTML = "";
  });

  select.addEventListener("change", selectFn);

  label.addEventListener("click", toggleFn);
}

window.addEventListener("DOMContentLoaded", todoFn);
