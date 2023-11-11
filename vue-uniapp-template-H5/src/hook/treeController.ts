import { ref } from 'vue';
import { Common_ETreeType } from '@/config/enum';
import type { Common_ITreeVO } from '@/api/model';

// 树模块-公共逻辑
export const useCommonTree = () => {
  // 树类型列表
  const treeTypeList = Object.entries(Common_ETreeType)?.map(([k, v]) => {
    return {
      code: v,
      name: k,
    };
  });
  // 树类型
  const treeType = ref<string>(treeTypeList?.[0].code);
  // 搜索内容
  const searchLabel = ref<string>('');
  // 面包屑
  const searchBreadCrumbList = ref<Common_ITreeVO[]>([]);
  /**
   * 面包屑快捷选择
   * @param tree
   */
  const queryChildrenByTree = (tree?: Common_ITreeVO) => {
    if (!!tree) {
      const index = searchBreadCrumbList.value.findIndex((item) => item.treeId === tree?.treeId);
      if (index !== searchBreadCrumbList.value.length - 1) {
        searchBreadCrumbList.value = searchBreadCrumbList.value.slice(0, index);
        queryTreeList(tree);
      }
    }
  };
  // 树列表
  const treeList = ref<Common_ITreeVO[]>([]);
  /**
   * 根据父节点id查询列表，不传则查顶级节点列表
   * @param {Common_ITreeVO} tree
   */
  const queryTreeList = (tree?: Common_ITreeVO) => {
    if (!tree) {
      searchBreadCrumbList.value = [];
    } else {
      searchBreadCrumbList.value.push(tree);
    }
    console.log('%c✨✨查询树节点列表✨✨', 'font-size: 24px', tree);
    treeList.value = [
      {
        treeId: 121,
        treeName: '测试1',
        parentId: null,
        parentName: '测试2',
        children: [
          {
            treeId: 232,
            treeName: '测试3',
            parentName: '测试4',
            parentId: 1,
          },
        ],
      },
      {
        treeId: 18,
        treeName: '测试5',
        parentId: null,
        parentName: '测试6',
        children: [
          {
            treeId: 72,
            treeName: '测试65',
            parentName: '测试7',
            parentId: 1,
          },
        ],
      },
      {
        treeId: 61,
        treeName: '测试112',
        parentId: null,
        parentName: '测试1245',
        children: [],
      },
      {
        treeId: 51,
        treeName: '测试145',
        parentId: null,
        parentName: '测试155',
        children: [
          {
            treeId: 42,
            treeName: '测试19',
            parentName: '测试17',
            parentId: 1,
          },
        ],
      },
      {
        treeId: 31,
        treeName: '测试123241',
        parentId: null,
        parentName: '测试11451',
        children: [],
      },
      {
        treeId: 12,
        treeName: '测试1421',
        parentId: null,
        parentName: '测试1663',
        children: [],
      },
    ];
  };

  return {
    treeTypeList,
    treeType,
    searchLabel,
    treeList,

    searchBreadCrumbList,
    queryChildrenByTree,
    queryTreeList,
  };
};
