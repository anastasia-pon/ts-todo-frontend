interface OktaAuthType {
  issuer: string;
  clientId: string;
  redirectUri: string;
  onAuthRequired: () => void;
  pkce: boolean;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Credentials {
  username: string;
  password: string;
}

interface AllListsContextState {
  userData: string[];
  lists: ListState[];
  fetchLists: () => void;
};

interface BaseList {
  title: string;
  desc: string;
  userId: string | undefined;
  listId: string | undefined;
}

interface TodoTask {
  title: string;
  taskId: string;
  done: boolean;
  order: number;
  cost: number;
  type: string;
  deadline?: string;
  carbs?: number;
  fat?: number;
  protein?: number;
  img?: string;
  sublistId?: string;
}

interface ListState extends BaseList {
  coEditing?: boolean;
  tasks?: TodoTask[];
}

interface FullListState {
  list: {
    title: string;
    desc: string;
    userId: string;
    listId: string;
    coEditing: string;
    tasks: [];
  };
  tasks: [];
}

interface BaseTask {
  taskId: string;
  parentId: string;
  listId: string;
  title: string;
  done: boolean;
  order?: number;
  cost?: string;
  type: string;
  deadline?: string;
  carbs?: string;
  fat?: string;
  protein?: string;
  img?: string;
  tasks: string[];
}

interface Guest {
  id: string;
  name: string;
  x?: number;
  y?: number;
}