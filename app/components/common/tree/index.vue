<template>
  <div class="menu-tree">
    <tree
      :data="treeData"
      :options="treeOptions"
      @node:dragging:start="logDragStart"
      @node:dragging:finish="logDragFinish"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import LiquorTree from 'liquor-tree';

Vue.use(LiquorTree);

@Component
export default class extends Vue {
  treeData = getTreeData();

  treeOptions = {
    propertyNames: {
      text: 'MY_TEXT',
      children: 'KIDS',
      state: 'OPTIONS',
    },
    dnd: true,
    checkbox: true,
  };

  logDragStart(node): void {
    console.log('Start dragging: ' + node.text);
  }

  logDragFinish(targetNode, distinationNode): void {
    console.log(`Stop dragging: [TARGET]${targetNode.text}`);
  }
}

function getTreeData() {
  return [
    {
      MY_TEXT: 'JS: The Right Way',
      OPTIONS: { expanded: true },
      KIDS: [
        {
          MY_TEXT: 'Getting Started (NOT DRAGGABLE)',
          OPTIONS: { checked: true, draggable: false },
        },
        { MY_TEXT: 'JavaScript Code Style', OPTIONS: { selected: true } },
        { MY_TEXT: 'MVC Pattern (NOT DROPABLE)', OPTIONS: { dropable: false } },
        { MY_TEXT: 'MVP Pattern' },
        { MY_TEXT: 'MVVM Pattern' },
        {
          MY_TEXT: 'The Good Parts',
          KIDS: [
            { MY_TEXT: 'OBJECT ORIENTED', OPTIONS: { checked: true } },
            { MY_TEXT: 'ANONYMOUS FUNCTIONS', OPTIONS: { checked: true } },
            {
              MY_TEXT: 'FUNCTIONS AS FIRST-CLASS OBJECTS',
              OPTIONS: { checked: true },
            },
            { MY_TEXT: 'LOOSE TYPING', OPTIONS: { checked: true } },
          ],
        },
        {
          MY_TEXT: 'Patterns',
          KIDS: [
            {
              MY_TEXT: 'DESIGN PATTERNS',
              OPTIONS: { expanded: true },
              KIDS: [
                {
                  MY_TEXT: 'Creational Design Patterns',
                  KIDS: [
                    { MY_TEXT: 'Factory' },
                    { MY_TEXT: 'Prototype' },
                    { MY_TEXT: 'Mixin' },
                    { MY_TEXT: 'Singleton' },
                  ],
                },
                { MY_TEXT: 'Structural Design Patterns' },
              ],
            },
            {
              MY_TEXT: 'MV* PATTERNS',
              cildren: [
                { MY_TEXT: 'MVC Pattern' },
                { MY_TEXT: 'MVP Pattern' },
                { MY_TEXT: 'MVVM Pattern' },
              ],
            },
          ],
        },
      ],
    },
  ];
}
</script>
<style scoped></style>
