import uuid1 from 'uuid/v1';

export function getId() {
  const id = uuid1();
  return id.replace(/-/g, '');
}
