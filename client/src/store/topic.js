import { observable, action, extendObservable, computed } from 'mobx';
import { topicSchema } from '../utils/variable-define';

const createTopic = topic => Object.assign({}, topicSchema, topic);

class Topic {
  constructor(data) {
    extendObservable(this, data);
    // Object.assign(this, data);
  }

  @observable syncing = false;
}

class TopicStore {
  @observable topics;
  @observable syncing;
  @observable details;

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
    this.details = details.map(detail => new Topic(createTopic(detail)));
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail;
      return result;
    }, {});
  }

  @action addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

  toJson() {
    return {
      topics: this.topics,
      syncing: this.syncing,
      details: this.details
    };
  }
}

export default TopicStore;
