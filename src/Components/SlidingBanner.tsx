import {useState, useEffect} from "react";
import {Api} from "../G_api";
import {Recipe} from "../types/recipetypes";

const SlidingBanner = () => {
  const [data, setData] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Inline styles
  const styles = {
    container: {
      margin: "-30px 0 0 calc(-50vw + 50%)",
      // top, right, bottom, left
      position: "relative" as React.CSSProperties["position"],
      width: "100vw",
      height: "500px",
      overflow: "hidden",
    },

    slide: {
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "absolute" as const,
      top: 0,
      left: 0,
      transition: "transform 0.5s ease-in-out",
    },
    activeSlide: {
      transform: "translateX(0)",
      zIndex: 1,
    },
    overlay: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
      opacity: 0.7,
    },
    content: {
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      padding: "24px",
      width: "100%",
      color: "white",
      zIndex: 2,
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "12px",
      color: "white",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    },
    details: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
      gap: "16px",
      flexWrap: "wrap" as const,
    },
    detailItem: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "16px",
    },
    tag: {
      padding: "6px 16px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "20px",
      fontSize: "14px",
      marginRight: "8px",
      color: "white",
      marginBottom: "8px",
      display: "inline-block",
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "8px",
    },
    navButton: {
      position: "absolute" as const,
      top: "50%",
      transform: "translateY(-50%)",
      width: "50px",
      height: "50px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "50%",
      color: "white",
      fontSize: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      zIndex: 3,
      transition: "background-color 0.3s",
      outline: "none",
    },
    navButtonHover: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "500px",
      fontSize: "18px",
      backgroundColor: "#f7f7f7",
      width: "100%",
    },
    error: {
      backgroundColor: "#fee2e2",
      padding: "20px",
      borderRadius: "8px",
      border: "1px solid #fecaca",
      color: "#dc2626",
      width: "100%",
    },
    dots: {
      position: "absolute" as const,
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "10px",
      zIndex: 5,
    },
    dot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      cursor: "pointer",
      border: "none",
      padding: 0,
      transition: "transform 0.3s, background-color 0.3s",
    },
    activeDot: {
      backgroundColor: "white",
      transform: "scale(1.3)",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(Api);

      if (!res.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const response = await res.json();

      // Check if response has recipes property or if it's the array directly
      let recipeData: Recipe[];
      if (response.recipes && Array.isArray(response.recipes)) {
        recipeData = response.recipes;
      } else if (Array.isArray(response)) {
        recipeData = response;
      } else {
        // If neither, try to find an array in the response
        const possibleArrays = Object.values(response).filter((val) => Array.isArray(val));
        if (possibleArrays.length > 0) {
          recipeData = possibleArrays[0] as Recipe[];
        } else {
          throw new Error("Could not find recipe data in the response");
        }
      }

      setData(recipeData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error(err);
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) {
    return <div style={styles.loading}>Loading delicious recipes...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div style={styles.error}>No recipes found. Please try again later.</div>;
  }

  const getSafeRecipe = (recipe: Recipe) => {
    return {
      name: recipe?.name || "Unnamed Recipe",
      image: recipe?.image || "https://placehold.co/600x400?text=No+Image",
      rating: recipe?.rating || 0,
      reviewCount: recipe?.reviewCount || 0,
      difficulty: recipe?.difficulty || "Unknown",
      cookTimeMinutes: recipe?.cookTimeMinutes || 0,
      prepTimeMinutes: recipe?.prepTimeMinutes || 0,
      tags: Array.isArray(recipe?.tags) ? recipe.tags : [],
    };
  };

  // Get current recipe
  const currentRecipe = getSafeRecipe(data[currentIndex]);
  const nextIndex = (currentIndex + 1) % data.length;
  const prevIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;

  return (
    <div style={styles.container}>
      {/* Current slide */}
      <div
        style={{
          ...styles.slide,
          ...styles.activeSlide,
          backgroundImage: `url(${currentRecipe.image})`,
        }}>
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <h2 style={styles.title}>{currentRecipe.name}</h2>
          <div style={styles.details}>
            <span style={styles.detailItem}>
              ⭐ {currentRecipe.rating} ({currentRecipe.reviewCount} reviews)
            </span>
            <span style={styles.detailItem}>🔥 {currentRecipe.difficulty}</span>
            <span style={styles.detailItem}>
              ⏱️ {currentRecipe.cookTimeMinutes + currentRecipe.prepTimeMinutes} min
            </span>
          </div>
          <div style={styles.tagsContainer}>
            {currentRecipe.tags.map((tag, idx) => (
              <span key={idx} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <button
        onClick={() => setCurrentIndex(prevIndex)}
        style={{...styles.navButton, left: "20px"}}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }}>
        ‹
      </button>
      <button
        onClick={() => setCurrentIndex(nextIndex)}
        style={{...styles.navButton, right: "20px"}}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }}>
        ›
      </button>

      {/* Pagination dots */}
      <div style={styles.dots}>
        {data.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              ...styles.dot,
              ...(idx === currentIndex ? styles.activeDot : {}),
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
