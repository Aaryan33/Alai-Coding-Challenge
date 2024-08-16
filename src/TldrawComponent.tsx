import React, { useEffect, useRef } from 'react';
import { TLShapeId, Tldraw, createShapeId } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

interface TldrawComponentProps {
  items: number;
}

const TldrawComponent: React.FC<TldrawComponentProps> = ({ items }) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const editor = editorRef.current;

    if (editor) {
      const itemWidth = 200;
      const startY = 200;
      const spacing = 300;

      const createShapes = () => {
        // To keep track of created shapes for cleanup
        const newShapeIds: TLShapeId[] = [];

        editor.deleteShapes(newShapeIds);

        for (let i = 0; i < items; i++) {
          const x = i * spacing;
          const y = startY;

          const rectangleId = createShapeId();
          const textId = createShapeId();

          editor.createShape({
            id: rectangleId,
            type: "geo",
            x,
            y,
            props: {
              w: itemWidth,
              h: 100,
              geo: "rectangle",
              fill: "solid",
            },
          });

          editor.createShape({
            id: textId,
            type: "text",
            x: x + itemWidth / 2,
            y: y + 120,
            props: {
              text: `Subheading ${i + 1}\nDescription ${i + 1}`,
            },
          });

          newShapeIds.push(rectangleId, textId);
        }

        return newShapeIds;
      };

      const shapeIds = createShapes();

      // Return a cleanup function to delete the shapes when component unmounts or items change
      return () => {
        editor.deleteShapes(shapeIds);
      };
    }
  }, [items]); // Run the effect when items changes

  return (
    <div style={{ position: "fixed", width: "100vw", height: "100vh" }}>
      <Tldraw
        hideUi={true}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default TldrawComponent;