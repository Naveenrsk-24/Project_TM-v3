"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

export const DraggableCardBody = ({
  className,
  children,
}) => {
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [scale, setScale] = useState(1);
  const dragStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate rotations (clamped between -25 and 25 degrees)
    const rotX = Math.max(-25, Math.min(25, (deltaY / 300) * 25));
    const rotY = Math.max(-25, Math.min(25, (deltaX / 300) * 25));

    setRotation({ x: -rotX, y: rotY });

    // Calculate opacity based on distance from center
    const distance = Math.abs(deltaX);
    const newOpacity = Math.max(0.8, Math.min(1, 1 - (distance / 300) * 0.2));
    setOpacity(newOpacity);

    // Calculate glare opacity
    const newGlareOpacity = Math.min(0.2, (distance / 300) * 0.2);
    setGlareOpacity(newGlareOpacity);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setRotation({ x: 0, y: 0 });
      setOpacity(1);
      setGlareOpacity(0);
      setScale(1);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    lastPosition.current = position;
    lastTime.current = Date.now();
  };

  const handleMouseMoveGlobal = (e) => {
    if (!isDragging) return;

    const now = Date.now();
    const dt = now - lastTime.current;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    // Apply constraints
    const constrainedX = Math.max(
      constraints.left,
      Math.min(constraints.right, newX)
    );
    const constrainedY = Math.max(
      constraints.top,
      Math.min(constraints.bottom, newY)
    );

    // Calculate velocity
    if (dt > 0) {
      velocity.current = {
        x: (constrainedX - lastPosition.current.x) / dt * 16,
        y: (constrainedY - lastPosition.current.y) / dt * 16,
      };
    }

    setPosition({ x: constrainedX, y: constrainedY });
    lastPosition.current = { x: constrainedX, y: constrainedY };
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.cursor = "default";

    // Animate back rotation
    setRotation({ x: 0, y: 0 });

    // Apply momentum with velocity
    const currentVelocityX = velocity.current.x;
    const currentVelocityY = velocity.current.y;

    const velocityMagnitude = Math.sqrt(
      currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY
    );

    if (velocityMagnitude > 10) {
      const finalX = position.x + currentVelocityX * 0.3;
      const finalY = position.y + currentVelocityY * 0.3;

      // Animate to final position with momentum
      animatePosition(position, { x: finalX, y: finalY }, 800);
    }
  };

  const animatePosition = (start, end, duration) => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentX = start.x + (end.x - start.x) * easeOut;
      const currentY = start.y + (end.y - start.y) * easeOut;

      setPosition({ x: currentX, y: currentY });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMoveGlobal);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, constraints]);

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setScale(1.02)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
        opacity: opacity,
        willChange: "transform",
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging
          ? "none"
          : "transform 0.3s cubic-bezier(0.2, 0, 0, 1), opacity 0.3s ease",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl dark:bg-neutral-900",
        className
      )}
    >
      {children}
      <div
        style={{
          opacity: glareOpacity,
          transition: "opacity 0.3s ease",
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
}) => {
  return (
    <div
      style={{ perspective: "3000px" }}
      className={cn("", className)}
    >
      {children}
    </div>
  );
};
