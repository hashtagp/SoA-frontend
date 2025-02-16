import { Suspense, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Cylinder, Float, Ring, Sphere } from '@react-three/drei';
import { StoreContext } from '../context/storeContext';
import '../styles/Home.css';

const Scene = () => {
  return (
    <group>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          {/* Base Platform */}
          <mesh position={[0, -2, 0]}>
            <cylinderGeometry args={[3, 3.5, 0.2, 8]} />
            <meshStandardMaterial 
              color="#1e293b"
              metalness={0.9}
              roughness={0.1}
              emissive="#3b82f6"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Main Building Structure */}
          <group position={[0, 0, 0]}>
            {/* Central Tower */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 4, 2]} />
              <meshStandardMaterial 
                color="#1e293b"
                metalness={0.9}
                roughness={0.1}
                emissive="#3b82f6"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Glass Panels */}
            {[-0.8, 0, 0.8].map((x, i) => (
              <group key={i} position={[x, 0, 1.01]}>
                {[-1, 0, 1].map((y, j) => (
                  <mesh key={`${i}-${j}`} position={[0, y, 0]}>
                    <planeGeometry args={[0.5, 0.8]} />
                    <meshStandardMaterial 
                      color="#60a5fa"
                      metalness={1}
                      roughness={0}
                      emissive="#93c5fd"
                      emissiveIntensity={0.5}
                      transparent
                      opacity={0.9}
                    />
                  </mesh>
                ))}
              </group>
            ))}

            {/* Side Wings */}
            {[-1, 1].map((x) => (
              <group key={x} position={[x * 2.5, -0.5, 0]}>
                <mesh>
                  <boxGeometry args={[1, 3, 1.5]} />
                  <meshStandardMaterial 
                    color="#1e293b"
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#3b82f6"
                    emissiveIntensity={0.2}
                  />
                </mesh>
                {/* Wing Windows */}
                <mesh position={[0, 0, 0.76]}>
                  <planeGeometry args={[0.8, 2.5]} />
                  <meshStandardMaterial 
                    color="#60a5fa"
                    metalness={1}
                    roughness={0}
                    emissive="#93c5fd"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
              </group>
            ))}

            {/* Top Structure */}
            <group position={[0, 2.5, 0]}>
              <mesh>
                <cylinderGeometry args={[1.5, 0.5, 1, 8]} />
                <meshStandardMaterial 
                  color="#1e293b"
                  metalness={0.9}
                  roughness={0.1}
                  emissive="#3b82f6"
                  emissiveIntensity={0.4}
                />
              </mesh>
            </group>

            {/* Floating Design Elements */}
            {Array.from({ length: 12 }).map((_, i) => (
              <Float 
                key={i}
                speed={2} 
                rotationIntensity={2} 
                floatIntensity={2}
                position={[
                  Math.cos(i * Math.PI / 6) * 4,
                  Math.sin(i * 2) * 2,
                  Math.sin(i * Math.PI / 6) * 4
                ]}
              >
                <mesh>
                  <octahedronGeometry args={[0.2]} />
                  <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              </Float>
            ))}
          </group>
        </group>
      </Float>

      {/* Ground Plane with Grid */}
      <gridHelper 
        args={[30, 30, "#172554", "#172554"]} 
        position={[0, -2.1, 0]} 
        rotation={[0, 0, 0]}
      />
    </group>
  );
};

const Home = () => {
  const { isVerified } = useContext(StoreContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleStartTest = () => {
    if (isVerified) {
      navigate('/instruction');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="home" ref={containerRef}>
      <div className="hero-section">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Master
            <span className="gradient-text"> NATA </span>
            with Confidence
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Elevate your architectural journey with our cutting-edge mock tests. 
            Experience realistic exam scenarios and boost your preparation with 
            instant feedback and comprehensive analytics.
          </motion.p>
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button 
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartTest}
            >
              Start Practice Test
            </motion.button>
            <Link to="/about">
              <motion.button 
                className="secondary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="model-container">
          <Canvas
            camera={{ position: [8, 5, 8], fov: 45 }}
            style={{
              width: '100%',
              height: '100%',
              background: '#0f172a'
            }}
          >
            <fog attach="fog" args={['#0f172a', 5, 20]} />
            <ambientLight intensity={0.5} />
            <spotLight 
              position={[10, 10, 10]} 
              angle={0.15} 
              penumbra={1} 
              intensity={1} 
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Suspense fallback={null}>
              <Scene />
              <OrbitControls 
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="features-section">
        <motion.div 
          className="features-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {[
            {
              icon: "🎯",
              title: "Realistic Questions",
              description: "Practice with meticulously crafted questions that mirror the actual NATA exam format and difficulty level."
            },
            {
              icon: "⏱️",
              title: "Timed Tests",
              description: "Build confidence and improve speed with our precisely timed mock tests that simulate real exam conditions."
            },
            {
              icon: "📊",
              title: "Instant Analysis",
              description: "Get detailed performance insights and personalized improvement suggestions after each practice session."
            },
            {
              icon: "📚",
              title: "Complete Coverage",
              description: "Access comprehensive study material covering all topics as per the latest NATA syllabus and guidelines."
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2>Ready to Excel in NATA?</h2>
          <p>Join thousands of successful aspirants who prepared with our platform</p>
          <Link to="/instruction">
            <motion.button 
              className="primary-button"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </Link>
        </div>
        <div className="cta-background"></div>
      </motion.div>
    </div>
  );
};

export default Home;