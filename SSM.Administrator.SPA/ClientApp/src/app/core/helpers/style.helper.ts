export class StyleHelper {

    /**
     * Remove "class" style name
     * @param element HTML referebce ibject
     * @param className name of css style
     */
  static removeClass(element: any, className: string) {
    if (element && element.className) {
      element.className = element.className.replace(new RegExp(className, 'gi'), '');

      //remove all space after end
      element.className = element.className.replace(/\s*$/, '');
    }
  }

  /**
   * Add "class" style name
   * @param element HTML referebce ibject
   * @param className name of css style
   */
  static addClass(element: any, className: string) {
    this.removeClass(element, className);
        
    if (element && element.className)
      element.className += ` ${className}`;
  }
}