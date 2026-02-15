import createGraph, { type Graph } from 'ngraph.graph';
import { aStar } from 'ngraph.path';
import { navigationGraph, type PathNode } from '@/config/navigatorPathsConfig';

export interface RoutePath {
  path: PathNode[];
  distance: number;
}

export class NavigationService {
  private static instance: NavigationService;
  private graph: Graph;
  private pathFinder: any;

  private constructor() {
    this.graph = createGraph();
    this.buildGraph();
    this.initializePathFinder();
  }

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  /**
   * Побудова графа з конфігурації
   */
  private buildGraph() {
    navigationGraph.forEach((node) => {
      // Додаємо ноду в граф з даними
      this.graph.addNode(node.id, node);

      // Додаємо ребра (зв'язки)
      node.connectedTo.forEach((neighborId) => {
        // Знаходимо сусідню ноду, щоб порахувати відстань (вагу ребра)
        const neighbor = navigationGraph.find((n) => n.id === neighborId);
        if (neighbor) {
          const distance = this.calculateDistance(node, neighbor);
          this.graph.addLink(node.id, neighborId, { weight: distance });
        }
      });
    });
  }

  /**
   * Ініціалізація алгоритму пошуку шляху (A*)
   */
  private initializePathFinder() {
    this.pathFinder = aStar(this.graph, {
      // Функція відстані (Euristic) - фізична відстань між точками
      distance(fromNode, toNode) {
        const dx = fromNode.data.x - toNode.data.x;
        const dy = fromNode.data.y - toNode.data.y;
        // Якщо поверхи різні, додаємо штраф (велику відстань), щоб алгоритм не "стрибав"
        // Але оскільки у нас переходи через сходи явні, це може бути не критично,
        // проте краще враховувати зміну поверху.
        const floorDz = (fromNode.data.floor - toNode.data.floor) * 1000;

        return Math.sqrt(dx * dx + dy * dy + floorDz * floorDz);
      },
      // Функція евристики (така ж як відстань)
      heuristic(fromNode, toNode) {
        const dx = fromNode.data.x - toNode.data.x;
        const dy = fromNode.data.y - toNode.data.y;
        const floorDz = (fromNode.data.floor - toNode.data.floor) * 1000;
        return Math.sqrt(dx * dx + dy * dy + floorDz * floorDz);
      },
    });
  }

  private calculateDistance(node1: PathNode, node2: PathNode): number {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    // Врахування поверхів для ваги ребра (хоча ребра зазвичай між сусідами на одному поверсі або сходами)
    // Для сходів відстань може бути умовною або 0, тут беремо просто координати.
    // Якщо це сходи між поверхами, coordinates можуть бути поруч або однакові.
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Знаходить шлях між двома нодами за їх ID
   */
  public findPath(startNodeId: string, endNodeId: string): PathNode[] | null {
    if (!startNodeId || !endNodeId) return null;

    const path = this.pathFinder.find(startNodeId, endNodeId);

    if (!path || path.length === 0) return null;

    // ngraph пвертає шлях з кінця в початок, тому реверсуємо
    // path node format: { id, data: PathNode, ... }
    return path.map((p: any) => p.data).reverse();
  }

  /**
   * Знаходить найближчу ноду графа до заданої кімнати
   */
  public findNodeByRoomId(roomId: string): PathNode | undefined {
    return navigationGraph.find((n) => n.linkedRoomId === roomId);
  }
}
